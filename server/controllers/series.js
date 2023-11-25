"use strict";

class Serie {
    constructor(title, creator, year, genre) {
        this.title = title;
        this.creator = creator;
        this.year = year;
        this.genre = genre;
    }

    // Getter para el título de la serie
    get getTitle() {
        return this.title;
    }

    // Setter para el título de la serie
    set setTitle(newTitle) {
        this.title = newTitle;
    }

    // Getter para el creador de la serie
    get getCreator() {
        return this.creator;
    }

    // Setter para el creador de la serie
    set setCreator(newCreator) {
        this.creator = newCreator;
    }

    // Getter para el año de la serie
    get getYear() {
        return this.year;
    }

    // Setter para el año de la serie
    set setYear(newYear) {
        this.year = newYear;
    }

    // Getter para el género de la serie
    get getGenre() {
        return this.genre;
    }

    // Setter para el género de la serie
    set setGenre(newGenre) {
        this.genre = newGenre;
    }



    static generateSerie(serie) {
        let title = serie.title;
        let director = serie.director;
        let year = serie.year;
        let genre = serie.genre;
        return new Serie(title, director, year, genre);
    }
}

module.exports = Serie;
