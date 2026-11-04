import test from "node:test";
import assert from "node:assert";
import { Watchlist } from "../../src/domain/Watchlist.js";

// Dummy de Media (cumpre a estrutura mínima sem importar a classe real)
const dummyMedia = { externalId: "123", title: "The Matrix" };
const anotherDummyMedia = { externalId: "456", title: "Avatar" };

test("Watchlist - adiciona e recupera entradas corretamente", () => {
  const watchlist = new Watchlist("user-1");

  watchlist.add(dummyMedia);
  const entry = watchlist.getEntry("123");

  assert.strictEqual(entry.media.title, "The Matrix");
  assert.strictEqual(entry.watched, false);
  assert.strictEqual(entry.rating, null);
});

test("Watchlist - impede a adição de duplicados", () => {
  const watchlist = new Watchlist("user-1");
  watchlist.add(dummyMedia);

  assert.throws(() => watchlist.add(dummyMedia), {
    message: "This title is already saved in user's watchlist.",
  });
});

test("WatchlistEntry - aplica as regras de avaliação", () => {
  const watchlist = new Watchlist("user-1");
  watchlist.add(dummyMedia);
  const entry = watchlist.getEntry("123");

  // Testar avaliação válida
  entry.rate(4);
  assert.strictEqual(entry.rating, 4);
  assert.strictEqual(entry.watched, true); // Avaliar marca automaticamente como visto

  // Testar limites (abaixo de 1 e acima de 5)
  assert.throws(() => entry.rate(0), {
    message: "Rating must be between 1 and 5.",
  });
  assert.throws(() => entry.rate(6), {
    message: "Rating must be between 1 and 5.",
  });
});