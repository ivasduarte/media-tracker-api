import test from 'node:test';
import assert from 'node:assert';
import { InMemoryWatchlistRepository } from '../../src/infrastructure/InMemoryWatchlistRepository.js';
import { Watchlist } from '../../src/domain/Watchlist.js';

test('InMemoryWatchlistRepository - guarda e recupera a watchlist', async () => {
  const repository = new InMemoryWatchlistRepository();
  const watchlist = new Watchlist('user-1');

  // 1. Tenta recuperar uma lista inexistente
  const notFound = await repository.findByUserId('user-1');
  assert.strictEqual(notFound, null);

  // 2. Guarda a nova lista
  await repository.save(watchlist);

  // 3. Recupera e valida a integridade dos dados
  const found = await repository.findByUserId('user-1');
  assert.strictEqual(found.userId, 'user-1');
});