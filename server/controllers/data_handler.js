"use strict";


const User = require('./users');
const Movie = require('./movies');
const Serie = require('./series');
const { Session } = require('inspector');

// Leer el contenido de users.json
// Parsear y convertir a User el contenido de users.json
// let usersContent = fs.readFileSync('./data/users.json');
let users = JSON.parse(usersContent).map(User.generateUser);

// Leer el contenido de movies.json
// let moviesContent = fs.readFileSync('./data/movies.json');
let movies = JSON.parse(moviesContent).map(Movie.generateMovie);

// Leer el contenido de movies.json
// let seriesContent = fs.readFileSync('./data/series.json');
let series = JSON.parse(seriesContent).map(Serie.generateSerie);



function getUsers() {
    return users;
}

function getUserByEmail(email) {
    return users.find(user => user.email === email);
}

function createUser(user) {
    if (isUserValid(user)) {
        users.push(User.generateUser(user));
        // fs.writeFileSync('./data/users.json',JSON.stringify(users))
    }
}

function updateUser(email, updatedUser) {
    let index = users.findIndex(user => user.email == email);
    if(index == -1) return;
    Object.assign(user[index],updateUser);
    fs.writeFileSync()
}

function deleteUser(email) {
    let index = users.findIndex(user => user.email == email);
    if(index == -1) return;
}

function isUserValid(nombre, apellidos, email) {
    if (users.find(user => user.nombre == nombre && user.apellidos == apellidos)) return false;
    if (users.find(user => user.email == email)) return false;
    return true;
}

















function getMovies() {
    return movies;
}

function getMovieByTitle(title) {
    console.log("Buscando: " + title);
    
    // Filtra los objetos vacíos en la lista de películas
    movies = movies.filter(movie => Object.keys(movie).length !== 0);

    const movie = movies.find(movie => movie.title === title);
    console.log("Encontrado: ", movie);
    return movie;
}

function createMovie(movie) {
    if (isMovieValid(movie)) {
        movies.push(movie);
        fs.writeFileSync('./data/movies.json', JSON.stringify(movies));
    }
}

function updateMovie(title, updatedMovie) {
    let index = movies.findIndex(movie => movie.title === title);
    if (index !== -1) {
        movies[index] = updatedMovie;
        fs.writeFileSync('./data/movies.json', JSON.stringify(movies));
    }
}

function deleteMovie(title) {
    let index = movies.findIndex(movie => movie.title === title);
    if (index !== -1) {
        movies.splice(index, 1);
        fs.writeFileSync('./data/movies.json', JSON.stringify(movies));
    }
}

function isMovieValid(title) {
    return !movies.find(movie => movie.title === title);
}






function getSeries() {
    return series;
}

function getSerieByTitle(title) {
    return series.find(serie => serie.title === title);
}

function createSerie(serie) {
    if (isSeriesValid(serie.title)) {
        series.push(serie);
        saveSeries();
    }
}

function updateSerie(title, updatedSeries) {
    let index = series.findIndex(serie => serie.title === title);
    if (index !== -1) {
        series[index] = updatedSeries;
        saveSeries();
    }
}

function deleteSerie(title) {
    let index = series.findIndex(serie => serie.title === title);
    if (index !== -1) {
        series.splice(index, 1);
        saveSeries();
    }
}

function isSerieValid(title) {
    return !series.find(serie => serie.title === title);
}

function saveSerie() {
    fs.writeFileSync('./data/series.json', JSON.stringify(series, null, 2));
}









module.exports = {
    getUsers,
    getMovies,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    getMovieByTitle,
    createMovie,
    updateMovie,
    deleteMovie,
    getSeries,
    getSerieByTitle,
    createSerie,
    updateSerie,
    deleteSerie
};
