export class SearchMedia {
    constructor(mediaProvider) {
        this.mediaProvider = mediaProvider;
    }

    async execute(query) {
        if(!query || query.trim() === '') throw new Error('SEARCH_QUERY_IS_REQUIRED');
        return await this.mediaProvider.search(query);
    }
}