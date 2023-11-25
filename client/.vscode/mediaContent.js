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

/**Clase general para Movies y Series**/
class MediaContent {
    constructor(title, rating, releaseYear, classification, genre, synopsis) {
        this._title = title;
        this._rating = rating;
        this._releaseYear = releaseYear;
        this._classification = classification;
        this._genre = genre;
        this._synopsis = synopsis;
    }

    get title() {
        return this._title;
    }
    set title(value) {
        if (typeof value !== 'string') {
            throw new MediaContentException('Input is not correctly');
        }
        this._title = value;
    }

    get rating() {
        return this._rating;
    }
    set rating(value) {
        if (typeof value !== 'number' || value < 0) {
            throw new MediaContentException('Input is not correctly or it cant be lower than 0');
        }
        this._rating = value;
    }

    get releaseYear() {
        return this._releaseYear;
    }
    set releaseYear(value) {
        let date = new Date();
        let year = date.getFullYear();
        if (typeof value !== 'number' || value < 1985 || value > year) {
            throw new MediaContentException('Input is not correctly or is out-of range');
        }
        this._releaseYear = value;
    }

    get classification() {
        return this._classification;
    }
    set classification(value) {
        if (!Array.isArray(value)) {
            throw new MediaContentException('Input is not correctly');
        }
        this._classification = value;
    }

    get genre() {
        return this._genre;
    }
    set genre(value) {
        if (!Array.isArray(value)) {
            throw new MediaContentException('Input is not correctly');
        }
        this._genre = value;
    }

    get synopsis() {
        return this._synopsis;
    }
    set synopsis(value) {
        if (typeof value !== 'string') {
            throw new MediaContentException('Input is not correctly');
        }
        this._synopsis = value;
    }

      //Metodos estaticos
      static createFromJson(jsonValue){
        let obj = JSON.parse(jsonValue);
        return MediaContent.createFromObject(obj);
    }

    static createFromObject(obj) {
        let newContet = {};
        Object.assign(newContent, obj);
        Product.cleanObject(newContet);
        let content = new MediaContent(obj.title,obj.rating,obj.releaseYear,obj.genre,obj.synopsis);
        return content;
    }
    
      

    static cleanObject(obj) {
        const mediaProperties = ['title','rating','releaseYear','genre','synopsis'];
        
        for (let prop of mediaProperties) {
          if (!obj.hasOwnProperty(prop)) {
            obj[prop] = null; // O asignar un valor predeterminado
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
