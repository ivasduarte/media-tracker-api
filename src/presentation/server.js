import "dotenv/config";
import express from "express";
import pg from "pg";
import { TmdbProvider } from "../infrastructure/TmdbProvider.js";
import { PostgresWatchlistRepository } from "../infrastructure/PostgresWatchlistRepository.js";
import { SearchMediaUseCase } from "../application/SearchMediaUseCase.js";
import { AddToWatchlistUseCase } from "../application/AddToWatchlistUseCase.js";
import { MarkMediaAsWatchedUseCase } from "../application/MarkMediaAsWatchedUseCase.js";
import { RateMediaUseCase } from "../application/RateMediaUseCase.js";
import { SearchController } from "./SearchController.js";
import { WatchlistController } from "./WatchlistController.js";

const app = express();
app.use(express.json());

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const tmdbProvider = new TmdbProvider(process.env.TMDB_API_KEY);
const watchlistRepo = new PostgresWatchlistRepository(pool);

const searchUseCase = new SearchMediaUseCase(tmdbProvider);
const addWatchlistUseCase = new AddToWatchlistUseCase(
  watchlistRepo,
  tmdbProvider,
);
const markWatchedUseCase = new MarkMediaAsWatchedUseCase(watchlistRepo);
const rateUseCase = new RateMediaUseCase(watchlistRepo);

const searchController = new SearchController(searchUseCase);
const watchlistController = new WatchlistController(
  addWatchlistUseCase,
  markWatchedUseCase,
  rateUseCase,
);

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
  console.log(`Media Tracker API a correr na porta ${PORT}`),
);