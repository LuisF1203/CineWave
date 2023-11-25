"use strict";

class MoviesException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class SerieException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class MediaContentException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class MediaContent {
    constructor(mediaProxies=[]) {
        /*
        this._title = MediaProxies.title;
        this._genre = MediaProxies.genre;
        this._director = MediaProxies.director;
        this._year = MediaProxies.year;
        this._imageURL = MediaProxies.imageURL;
        this._video = MediaProxies.video;*/
        this._mediaProxies=mediaProxies;
    }

    get title() {
        return this._title;
    }
    set title(value) {
        if (typeof value !== 'string') {
            throw new MediaContentException('Input is not correct');
        }
        this._title = value;
    }

    get genre() {
        return this._genre;
    }
    set genre(value) {
        if (!Array.isArray(value)) {
            throw new MediaContentException('Input is not correct');
        }
        this._genre = value;
    }

    get director() {
        return this._director;
    }
    set director(value) {
        if (typeof value !== 'string') {
            throw aMediaContentException('Input is not correct');
        }
        this._director = value;
    }

    get year() {
        return this._year;
    }
    set year(value) {
        let date = new Date();
        let currentYear = date.getFullYear();
        if (typeof value !== 'number' || value < 1985 || value > currentYear) {
            throw new MediaContentException('Input is not correct or is out-of range');
        }
        this._year = value;
    }

    get imageURL() {
        return this._imageURL;
    }
    set imageURL(value) {
        if (typeof value !== 'string') {
            throw new MediaContentException('Input is not correct');
        }
        this._imageURL = value;
    }

    get video() {
        return this._video;
    }
    set video(value) {
        if (typeof value !== 'string') {
            throw new MediaContentException('Input is not correct');
        }
        this._video = value;
    }

    // Métodos estáticos
    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return MediaContent.createFromObject(obj);
    }

    static createFromObject(obj) {
        let content = new MediaContent(
            obj.title || null,
            obj.genre || null,
            obj.director || null,
            obj.year || null,
            obj.imageURL || null,
            obj.video || null
        );
        return content;
    }

    static cleanObject(obj) {
        const mediaProperties = ['title', 'genre', 'director', 'year', 'imageURL', 'video'];

        for (let prop in obj) {
            if (!mediaProperties.includes(prop)) {
                delete obj[prop];
            }
        }
    }
}

class Movie extends MediaContent {
    // Puedes agregar propiedades y métodos específicos de películas si es necesario
}

class Series extends MediaContent {
    // Puedes agregar propiedades y métodos específicos de series si es necesario
}
