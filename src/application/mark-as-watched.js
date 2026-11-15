export class MarkMediaAsWatched {
  constructor(watchlistRepository) {
    this.watchlistRepository = watchlistRepository;
  }

  async execute(userId, mediaExternalId) {
    const watchlist = await this.watchlistRepository.findByUserId(userId);
    if (!watchlist) throw new Error('WATCHLIST_NOT_FOUND');

    const entry = watchlist.getEntry(mediaExternalId);
    if (!entry) throw new Error('MEDIA_NOT_FOUND_IN_WATCHLIST');

    entry.markAsWatched();
    await this.watchlistRepository.save(watchlist);
    return entry;
  }
}