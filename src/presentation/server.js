import express from "express";
import { TmdbProvider } from "../infrastructure/TmdbProvider.js";
import { SearchMediaUseCase } from "../application/SearchMediaUseCase.js";
import { SearchController } from "./SearchController.js";

const app = express();
app.use(express.json());

// Dependencies
const tmdbProvider = new TmdbProvider("TEMP_API_KEY");
const searchUseCase = new SearchMediaUseCase(tmdbProvider);
const searchController = new SearchController(searchUseCase);

// Route (bind is necessary so the method doesn't lose the class reference)
app.get("/api/search", searchController.handle.bind(searchController));

app.listen(3000, () => {
  console.log("Media Tracker API running on Port 3000.");
});