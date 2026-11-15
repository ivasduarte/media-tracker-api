import test, { mock } from "node:test";
import assert from "node:assert";
import { SearchMedia } from "../../src/application/search.js";
import { Media } from "../../src/domain/media.js";

test("SearchMedia - orquestra a pesquisa corretamente (Mock Provider)", async () => {
  // 1. STUB: Cria um provider falso que devolve um array fixo de Medias
  const mockProvider = {
    search: mock.fn(async () => [
      new Media({ externalId: "123", title: "Matrix", type: "movie" }),
    ]),
  };

  const useCase = new SearchMedia(mockProvider);

  // 2. AÇÃO: Executa o caso de uso
  const results = await useCase.execute("Matrix");

  // 3. ASSERT: Valida o retorno
  assert.strictEqual(results.length, 1);
  assert.strictEqual(results[0].title, "Matrix");

  // 4. SPY (Verify): Confirma se o caso de uso chamou o provider com a query correta
  assert.strictEqual(mockProvider.search.mock.calls.length, 1);
  assert.strictEqual(mockProvider.search.mock.calls[0].arguments[0], "Matrix");
});

test("SearchMedia - rejeita query vazia", async () => {
  const mockProvider = { search: mock.fn() };
  const useCase = new SearchMedia(mockProvider);

  await assert.rejects(async () => await useCase.execute(""), {
    message: 'SEARCH_QUERY_IS_REQUIRED',
  });

  // Confirma que o provider nunca foi chamado
  assert.strictEqual(mockProvider.search.mock.calls.length, 0);
});