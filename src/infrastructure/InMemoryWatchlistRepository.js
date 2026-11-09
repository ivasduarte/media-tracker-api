export class InMemoryWatchlistRepository {
  constructor() {
    this.data = new Map();
  }

  async findByUserId(userId) {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return this.data.get(userId) || null;
  }

  async save(watchlist) {
    await new Promise((resolve) => setTimeout(resolve, 10));
    this.data.set(watchlist.userId, watchlist);
  }
}
