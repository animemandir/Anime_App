function CardItem(media){
    const STATUSES = {WATCHED: 'yes', NOT_WATCHED: 'no'}

    media.status = STATUSES.NOT_WATCHED;

    media.seenAnime = function (){
        this.status = STATUSES.WATCHED;
    }

    media.notSeen = function (){
        this.status = STATUSES.NOT_WATCHED;
    }

    media.isAvailable = function (){
        return this.status === STATUSES.NOT_WATCHED;
    }

    return media;
}


class Anime {
    picture = '';
    title = '';
    studio = '';
    genre = '';
    rating = '';
    summary = '';

    constructor(picture, title, studio, genre, rating, summary) {
        this.picture = picture;
        this.title = title;
        this.studio = studio;
        this.genre = genre;
        this.rating = rating;
        this.summary = summary;
    }
}

export {CardItem, Anime}