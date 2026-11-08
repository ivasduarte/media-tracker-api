import test, { mock } from "node:test";
import assert from "node:assert";
import { AddToWatchlistUseCase } from "../../src/application/AddToWatchlistUseCase.js";
import { Watchlist } from "../../src/domain/Watchlist.js";
import { Media } from "../../src/domain/Media.js";

test("AddToWatchlistUseCase - orquestra a adição e guarda na base de dados", async () => {
  // 1. STUB: Repository falso
  const mockWatchlist = new Watchlist("user-1");
  const mockRepo = {
    findByUserId: mock.fn(async () => mockWatchlist),
    save: mock.fn(async () => true),
  };

  // 2. STUB: Provider falso (TMDB)
  const dummyMedia = new Media({
    externalId: "101",
    title: "Matrix",
    type: "movie",
  });
  const mockProvider = {
    getById: mock.fn(async () => dummyMedia),
  };

  const useCase = new AddToWatchlistUseCase(mockRepo, mockProvider);

  // 3. AÇÃO
  const result = await useCase.execute("user-1", "101");

  // 4. ASSERT & SPY
  assert.strictEqual(result.media.title, "Matrix");
  assert.strictEqual(result.watched, false);

  // Verifica se o Provider foi chamado corretamente
  assert.strictEqual(mockProvider.getById.mock.calls[0].arguments[0], "101");

  // Verifica se a base de dados foi chamada para guardar
  assert.strictEqual(mockRepo.save.mock.calls.length, 1);
  assert.strictEqual(mockRepo.save.mock.calls[0].arguments[0].userId, "user-1");
});

test("AddToWatchlistUseCase - rejeita se o media não existir no TMDB", async () => {
  const mockRepo = {
    findByUserId: mock.fn(async () => new Watchlist("user-1")),
  };

  // STUB forçando retorno nulo (simula filme não encontrado)
  const mockProvider = { getById: mock.fn(async () => null) };

  const useCase = new AddToWatchlistUseCase(mockRepo, mockProvider);

  await assert.rejects(async () => await useCase.execute("user-1", "999"), {
    message: "Media not found.",
  });
});