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
    /* ... manténs o código anterior ... */
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
      if (score === undefined)
        return res.status(400).json({ error: "Score is mandatory." });

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