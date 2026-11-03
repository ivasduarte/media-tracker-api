import test, { mock } from "node:test";
import assert from "node:assert";
import { SearchController } from "../../src/presentation/SearchController.js";

test("SearchController - devolve 200 e os resultados em caso de sucesso", async () => {
  // 1. STUB: Simula o Caso de Uso
  const mockUseCase = {
    execute: mock.fn(async () => [{ title: "Inception" }]),
  };

  const controller = new SearchController(mockUseCase);

  // 2. STUB: Simula os objetos do Express
  const req = { query: { q: "Inception" } };

  const res = {};
  res.status = mock.fn(() => res); // Permite encadeamento: res.status().json()
  res.json = mock.fn();

  // 3. AÇÃO
  await controller.handle(req, res);

  // 4. SPY: Verifica comportamento HTTP
  assert.strictEqual(res.status.mock.calls[0].arguments[0], 200);
  assert.strictEqual(res.json.mock.calls[0].arguments[0][0].title, "Inception");
});

test("SearchController - devolve 400 se a query estiver vazia", async () => {
  const mockUseCase = { execute: mock.fn() };
  const controller = new SearchController(mockUseCase);

  const req = { query: {} };
  const res = { status: mock.fn(() => res), json: mock.fn() };

  await controller.handle(req, res);

  assert.strictEqual(res.status.mock.calls[0].arguments[0], 400);
  assert.strictEqual(mockUseCase.execute.mock.calls.length, 0); // Garante que não chamou a aplicação
});