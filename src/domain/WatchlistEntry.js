export class WatchlistEntry {
    constructor(media) {
        if(!media) throw new Error('Reference to Media is mandatory.');
        this.media = media;
        this.watched = false;
        this.rating = null;
    }

    markAsWatched() {
        this.watched = true;
    }

    rate(score) {
        if (score < 1 || score > 5) throw new Error('Rating must be between 1 and 5.');
        this.rating = score;
        this.watched = true;
    }
}