export class MarkMediaAsWatchedUseCase {
  constructor(watchlistRepository) {
    this.watchlistRepository = watchlistRepository;
  }

  async execute(userId, mediaExternalId) {
    const watchlist = await this.watchlistRepository.findByUserId(userId);
    if (!watchlist) throw new Error("Watchlist not found.");

    const entry = watchlist.getEntry(mediaExternalId);
    if (!entry) throw new Error("Media not found in watchlist.");

    entry.markAsWatched();
    await this.watchlistRepository.save(watchlist);

    return entry;
  }
}