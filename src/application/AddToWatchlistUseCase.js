import { Watchlist } from "../domain/Watchlist.js";

export class AddToWatchlistUseCase {
  constructor(watchlistRepository, mediaProvider) {
    this.watchlistRepository = watchlistRepository;
    this.mediaProvider = mediaProvider;
  }

  async execute(userId, mediaExternalId) {
    if (!userId || !mediaExternalId) {
      throw new Error("User ID and Media ID are mandatory.");
    }

    let watchlist = await this.watchlistRepository.findByUserId(userId);
    if (!watchlist) {
      watchlist = new Watchlist(userId);
    }

    const media = await this.mediaProvider.getById(mediaExternalId);
    if (!media) {
      throw new Error("Media not found.");
    }

    watchlist.add(media);

    await this.watchlistRepository.save(watchlist);

    return watchlist.getEntry(mediaExternalId);
  }
}