export class WatchlistEntry {
    constructor(media) {
        if(!media) throw new Error('MEDIA_IS_MANDATORY');
        this.media = media;
        this.watched = false;
        this.rating = null;
    }

    markAsWatched() {
        this.watched = true;
    }

    rate(score) {
        if (score < 1 || score > 5) throw new Error('RATING_INVALID_RANGE');
        this.rating = score;
        this.watched = true;
    }
}