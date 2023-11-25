"use strict";

class NetflixContent {
    constructor() {
        this._series = [];
        this._movies = [];
        this._category = [];
        this._myList = [];
    }

    // Agrega una película a la lista de películas
    addMovie(title, rating, releaseYear, classification, genre, synopsis, movieSpecificProperty) {
        const movie = new Movie(title, rating, releaseYear, classification, genre, synopsis, movieSpecificProperty);
        this._movies.push(movie);
    }

    // Agrega una serie a la lista de series
    addSeries(title, rating, releaseYear, classification, genre, synopsis, seriesSpecificProperty) {
        const series = new Series(title, rating, releaseYear, classification, genre, synopsis, seriesSpecificProperty);
        this._series.push(series);
    }

    // Agrega contenido a la lista de favoritos
    addToMyList(mediaContent) {
        this._myList.push(mediaContent);
    }
}

