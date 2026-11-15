import { Media } from '../domain/Media.js';

export class TmdbProvider {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.themoviedb.org/3';
  }

  async search(query) {
    const url = `${this.baseUrl}/search/movie?query=${query}&api_key=${this.apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro no TMDB.');
    const data = await response.json();
    return data.results.map(item => new Media({
      externalId: item.id.toString(),
      title: item.title,
      type: 'movie'
    }));
  }

  async getById(id) {
    const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`;
    const response = await fetch(url);
    
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('Erro na comunicação com a API do TMDB.');
    
    const data = await response.json();
    
    return new Media({
      externalId: data.id.toString(),
      title: data.title || data.name,
      type: 'movie'
    });
  }
}