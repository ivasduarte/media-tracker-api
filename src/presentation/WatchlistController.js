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
        return res.status(400).json({
          error:
            "The parameters 'userId' and 'mediaId' are required in the body.",
        });
      }

      const result = await this.addToWatchlistUseCase.execute(userId, mediaId);
      return res.status(201).json(result);
    } catch (error) {
      console.error("[DEBUG] Erro no AddToWatchlist:", error);
      
      if (
        error.message === "Media not found." ||
        error.message === "The title is already on my watchlist."
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error." });
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