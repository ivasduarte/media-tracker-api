export class SearchMediaUseCase {
    constructor(mediaProvider) {
        this.mediaProvider = mediaProvider;
    }

    async execute(query) {
        if(!query || query.trim() === '') throw new Error('Search query is mandatory.');
        return await this.mediaProvider.search(query);
    }
}