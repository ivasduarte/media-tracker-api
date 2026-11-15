import { Watchlist } from "../domain/watchlist.js";

export class AddToWatchlist {
  constructor(watchlistRepository, mediaProvider) {
    this.watchlistRepository = watchlistRepository;
    this.mediaProvider = mediaProvider;
  }

  async execute(userId, mediaExternalId) {
    if (!userId || !mediaExternalId) throw new Error('ID_ARE_MANDATORY');

    let watchlist = await this.watchlistRepository.findByUserId(userId);
    if (!watchlist) watchlist = new Watchlist(userId);
  
    const media = await this.mediaProvider.getById(mediaExternalId);
    if (!media) throw new Error('MEDIA_NOT_FOUND');
    
    watchlist.add(media);
    await this.watchlistRepository.save(watchlist);
    return watchlist.getEntry(mediaExternalId);
  }
}