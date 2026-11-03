import test, { mock } from 'node:test';
import assert from 'node:assert';
import { TmdbProvider } from '../../src/infrastructure/TmdbProvider.js';

test('TmdbProvider - pesquisa e mapeia filmes corretamente (Mocking)', async (t) => {
    const provider = new TmdbProvider('fake-api-key');

    // 1. STUB: Substitui a chamada real de rede por uma resposta forjada
    const fakeTmdbResponse = {
        results: [
            { id: 101, title: 'Inception', media_type: 'movie', release_date: '2010-07-15' }
        ]
    };

    const fetchMock = mock.method(global, 'fetch', async () => {
        return {
            ok: true,
            json: async () => fakeTmdbResponse
        };
    });

    // 2. AÇÃO: Executa o método
    const results = await provider.search('Inception');

    // 3. ASSERT: Verifica se o mapeamento para o Domínio funcionou
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].title, 'Inception');
    assert.strictEqual(results[0].type, 'movie');

    // 4. SPY: Verifica se o fetch foi chamado com a URL exata
    assert.strictEqual(fetchMock.mock.calls.length, 1);
    const requestedUrl = fetchMock.mock.calls[0].arguments[0];
    assert.ok(requestedUrl.includes('query=Inception'));
    assert.ok(requestedUrl.includes('api_key=fake-api-key'));

    // Limpa o mock no fim do teste
    mock.restoreAll();
});