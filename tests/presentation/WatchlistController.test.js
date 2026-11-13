import test, { mock } from "node:test";
import assert from "node:assert";
import { WatchlistController } from "../../src/presentation/WatchlistController.js";

test("WatchlistController - retorna 201 ao adicionar com sucesso", async () => {
  const mockUseCase = {
    execute: mock.fn(async () => ({
      media: { title: "Matrix" },
      watched: false,
    })),
  };
  const controller = new WatchlistController(mockUseCase);

  const req = { body: { userId: "user-1", mediaId: "101" } };
  const res = { status: mock.fn(() => res), json: mock.fn() };

  await controller.add(req, res);

  assert.strictEqual(res.status.mock.calls[0].arguments[0], 201);
  assert.strictEqual(res.json.mock.calls[0].arguments[0].media.title, "Matrix");
});
