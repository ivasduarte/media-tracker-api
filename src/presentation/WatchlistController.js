export class WatchlistController {
  constructor(addToWatchlistUseCase) {
    this.addToWatchlistUseCase = addToWatchlistUseCase;
  }

  async add(req, res) {
    try {
      const { userId, mediaId } = req.body;
      if (!userId || !mediaId) {
        return res
          .status(400)
          .json({
            error: "Parâmetros 'userId' e 'mediaId' são obrigatórios no body.",
          });
      }

      const result = await this.addToWatchlistUseCase.execute(userId, mediaId);
      return res.status(201).json(result);
    } catch (error) {
      if (
        error.message === "Media not found." ||
        error.message === "O título já se encontra na watchlist."
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}