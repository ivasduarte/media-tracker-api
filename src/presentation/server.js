import express from "express";
import { TmdbProvider } from "../infrastructure/TmdbProvider.js";
import { InMemoryWatchlistRepository } from "../infrastructure/InMemoryWatchlistRepository.js";
import { SearchMediaUseCase } from "../application/SearchMediaUseCase.js";
import { AddToWatchlistUseCase } from "../application/AddToWatchlistUseCase.js";
import { SearchController } from "./SearchController.js";
import { WatchlistController } from "./WatchlistController.js";

const app = express();
app.use(express.json());

const tmdbProvider = new TmdbProvider("A_TUA_API_KEY");
const watchlistRepo = new InMemoryWatchlistRepository();

const searchUseCase = new SearchMediaUseCase(tmdbProvider);
const addWatchlistUseCase = new AddToWatchlistUseCase(
  watchlistRepo,
  tmdbProvider,
);

const searchController = new SearchController(searchUseCase);
const watchlistController = new WatchlistController(addWatchlistUseCase);

app.get("/api/search", searchController.handle.bind(searchController));
app.post("/api/watchlist", watchlistController.add.bind(watchlistController));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Media Tracker API a correr na porta ${PORT}`),
);