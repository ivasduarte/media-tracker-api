export class Media {
    constructor({ id, externalId, title, type, releaseDate }) {
        if(!title || !type) throw new Error("Title and type are mandatory.");

        this.id = id; // Internal ID from the database
        this.externalId = externalId; // TMDB's ID
        this.title = title;
        this.type = type; // 'movie' or 'series'
        this.releaseDate = releaseDate;
    }
}