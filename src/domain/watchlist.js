import { WatchlistEntry } from "./watchlist-entry.js";

export class Watchlist {
  constructor(userId) {
    if (!userId) throw new Error('USER_ID_IS_MANDATORY');
    this.userId = userId;
    this.entries = new Map();
  }

  add(media) {
    const key = media.externalId;
    if (this.entries.has(key)) throw new Error('MEDIA_ALREADY_EXISTS');
    this.entries.set(key, new WatchlistEntry(media));
  }

  getEntry(mediaExternalId) {
    return this.entries.get(mediaExternalId) || null;
  }
}
