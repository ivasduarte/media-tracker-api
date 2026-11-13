import express from "express";
import { TmdbProvider } from "../infrastructure/TmdbProvider.js";
import { InMemoryWatchlistRepository } from "../infrastructure/InMemoryWatchlistRepository.js";
import { SearchMediaUseCase } from "../application/SearchMediaUseCase.js";
import { AddToWatchlistUseCase } from "../application/AddToWatchlistUseCase.js";
import { SearchController } from "./SearchController.js";
import { WatchlistController } from "./WatchlistController.js";
import { MarkMediaAsWatchedUseCase } from "../application/MarkMediaAsWatchedUseCase.js";
import { RateMediaUseCase } from "../application/RateMediaUseCase.js";

const app = express();
app.use(express.json());

const tmdbProvider = new TmdbProvider("A_TUA_API_KEY");
const watchlistRepo = new InMemoryWatchlistRepository();

const searchUseCase = new SearchMediaUseCase(tmdbProvider);
const addWatchlistUseCase = new AddToWatchlistUseCase(
  watchlistRepo,
  tmdbProvider,
);
const markWatchedUseCase = new MarkMediaAsWatchedUseCase(watchlistRepo);
const rateUseCase = new RateMediaUseCase(watchlistRepo);

const searchController = new SearchController(searchUseCase);
const watchlistController = new WatchlistController(addWatchlistUseCase, markWatchedUseCase, rateUseCase);

app.get("/api/search", searchController.handle.bind(searchController));
app.post("/api/watchlist", watchlistController.add.bind(watchlistController));
app.patch(
  "/api/watchlist/watched",
  watchlistController.markAsWatched.bind(watchlistController),
);
app.patch(
  "/api/watchlist/rate",
  watchlistController.rate.bind(watchlistController),
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Media Tracker API running on port ${PORT}`),
)