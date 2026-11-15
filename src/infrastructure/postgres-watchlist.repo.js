import { Watchlist } from "../domain/watchlist.js";
import { WatchlistEntry } from "../domain/watchlist-entry.js";
import { Media } from "../domain/media.js";

export class PostgresWatchlistRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findByUserId(userId) {
    const { rows } = await this.pool.query(
      "SELECT * FROM watchlist_entries WHERE user_id = $1",
      [userId],
    );

    if (rows.length === 0) return null;

    const watchlist = new Watchlist(userId);
    rows.forEach((row) => {
      const media = new Media({
        externalId: row.media_id,
        title: row.title,
        type: row.type,
      });

      const entry = new WatchlistEntry(media);
      entry.watched = row.watched;
      entry.rating = row.rating;

      watchlist.entries.set(row.media_id, entry);
    });

    return watchlist;
  }

  async save(watchlist) {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN"); // Inicia transação

      await client.query(
        "INSERT INTO watchlists (user_id) VALUES ($1) ON CONFLICT DO NOTHING",
        [watchlist.userId],
      );

      for (const [mediaId, entry] of watchlist.entries) {
        await client.query(
          `INSERT INTO watchlist_entries (user_id, media_id, title, type, watched, rating) 
           VALUES ($1, $2, $3, $4, $5, $6) 
           ON CONFLICT (user_id, media_id) DO UPDATE SET watched = $5, rating = $6`,
          [
            watchlist.userId,
            mediaId,
            entry.media.title,
            entry.media.type,
            entry.watched,
            entry.rating,
          ],
        );
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}