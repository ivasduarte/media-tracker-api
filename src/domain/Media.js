export class Media {
    constructor({ id, externalId, title, type, releaseDate }) {
        if(!title || !type) throw new Error('TITLE_AND_TYPE_ARE_MANDATORY');

        this.id = id; // Internal ID from the database
        this.externalId = externalId; // TMDB's ID
        this.title = title;
        this.type = type; // 'movie' or 'series'
        this.releaseDate = releaseDate;
    }
}