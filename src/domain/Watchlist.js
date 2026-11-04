import { WatchlistEntry } from "./WatchlistEntry.js";

export class Watchlist {
  constructor(userId) {
    if (!userId) throw new Error("User ID is mandatory.");
    this.userId = userId;
    this.entries = new Map();
  }

  add(media) {
    const key = media.externalId;
    if (this.entries.has(key))
      throw new Error("This title is already saved in user's watchlist.");
    this.entries.set(key, new WatchlistEntry(media));
  }

  getEntry(mediaExternalId) {
    return this.entries.get(mediaExternalId) || null;
  }
}
