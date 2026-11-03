import { Media } from '../domain/Media.js';

export class TmdbProvider {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://api.themoviedb.org/3";
    }

    async search(query) {
        const response = await fetch(
          `${this.baseUrl}/search/multi?query=${query}&api_key=${this.apiKey}`,
        );

        if(!response.ok) throw new error('Failure communicating with TMDB.');

        const data = await response.json();

        return data.results.filter(
            item => item.media_type === 'movie' || item.media_type === 'tv')
            .map(item => new Media({
                externalId: item.id.toString(),
                title: item.title || item.name,
                type: item.media_type === 'tv' ? 'series' : 'movie',
                releaseDate: item.release_date || item.first_air_date
            }));
    }
}