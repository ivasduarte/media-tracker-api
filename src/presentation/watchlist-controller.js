export class WatchlistController {
  constructor(
    addToWatchlistUseCase,
    markMediaAsWatchedUseCase,
    rateMediaUseCase,
  ) {
    this.addToWatchlistUseCase = addToWatchlistUseCase;
    this.markMediaAsWatchedUseCase = markMediaAsWatchedUseCase;
    this.rateMediaUseCase = rateMediaUseCase;
  }

  async add(req, res) {
    try {
      const { userId, mediaId } = req.body;
      if (!userId || !mediaId) {
        return res.status(400).json({ errorCode: 'MISSING_PARAMETERS' });
      }

      const result = await this.addToWatchlistUseCase.execute(userId, mediaId);
      return res.status(201).json(result);
    } catch (error) {
      if (['MEDIA_NOT_FOUND', 'MEDIA_ALREADY_EXISTS'].includes(error.message)) {
        return res.status(400).json({ errorCode: error.message });
      }
      console.error(error);
      return res.status(500).json({ errorCode: 'INTERNAL_SERVER_ERROR' });
    }
  }

  async markAsWatched(req, res) {
    try {
      const { userId, mediaId } = req.body;
      const result = await this.markMediaAsWatchedUseCase.execute(
        userId,
        mediaId,
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async rate(req, res) {
    try {
      const { userId, mediaId, score } = req.body;
      if (score === undefined) return res.status(400).json({ errorCode: 'MISSING_PARAMETERS' });

      const result = await this.rateMediaUseCase.execute(
        userId,
        mediaId,
        score,
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}