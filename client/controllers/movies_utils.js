"use strict";

const movieContainer = document.getElementById('movieList');
const myListContainer = document.getElementById('myListContainer');
const continueWatichingListContainer= document.getElementById('continue-watching-list');

async function movieToHtml(movie) {
    let newMovie=JSON.stringify(movie).replace(/\"/g,"&quot;")
    console.log("esto es lo que se tiene: ",movie.imageURL);
    return `
    <div class="movie-card">
        <div onclick="mostrarDetallePelicula(${newMovie})" class="img-card">
            <img class="card-img-top" src="${movie.imageURL}" alt="${movie.title}">
        </div>
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
            <p class="card-text">${movie.director}</p>
            <p><span>${movie.year}</span></p>
        </div>
        <button onclick="addToMyList(${newMovie})" class="add-btn">
            <img  src="../assets/add.svg">
        </button>
    </div>
    `;
}

async function mediaMyListToHtml(movie) {
    let newMovie=JSON.stringify(movie).replace(/\"/g,"&quot;")
    return `
    <div class="movie-card">
        <div onclick="mostrarDetallePelicula(${newMovie})" class="img-card">
            <img class="card-img-top" src="${movie.imageURL}" alt="${movie.title}">
        </div>
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
            <p class="card-text">${movie.director}</p>
            <p><span>${movie.year}</span></p>
        </div>
        <button onclick="deleteFromMyList(${newMovie})" class="add-btn">
            <img  src="../assets/delete.svg">
        </button>
    </div>
    `;
}


async function mediaWatchingListToHtml(movie, progress) {
    let newMovie = JSON.stringify(movie).replace(/\"/g, "&quot;");
    
    // Calculate the width of the progress bar based on the progress value
    const progressBarWidth = `${progress}%`;

    return `
        <div class="movie-card">
            <div onclick="mostrarDetallePelicula(${newMovie})" class="img-card">
                <img class="card-img-top" src="${movie.imageURL}" alt="${movie.title}">

            </div>
            <div class="card-body">
                <h4 class="card-title">${movie.title}</h4>
                <p class="card-text">${movie.director}</p>
                <p><span>${movie.year}</span></p>
            </div>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${progressBarWidth}" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    `;
}



async function moviesToHtml() {
    const movies = await loadMedias(moviesURL);

    const movieHtmlArray = movies.map(async (movie) => {
        const html = await movieToHtml(movie);
        return html;
    });

    return Promise.all(movieHtmlArray);
}


async function moviesByGenreToHtml(genre) {
    const movies = await loadMedias(moviesURL);
    const lowerCaseGenre = genre.toLowerCase();

    const movieHtmlArray = [];

    for (const movie of movies) {
        // Check if the lowercase genre is included in the lowercase movie genres
        if (movie.genre.map(g => g.toLowerCase()).includes(lowerCaseGenre)) {
            const html = await movieToHtml(movie);
            movieHtmlArray.push(html);
        }
    }

    return Promise.all(movieHtmlArray);
}

async function mediaByTypeToHtml(type) {
    const medias = await loadMedias(moviesURL);
    // const lowerCaseGenre = genre.toLowerCase();

    // const movieHtmlArray = [];

    // for (const movie of movies) {
    //     // Check if the lowercase genre is included in the lowercase movie genres
    //     if (movie.genre.map(g => g.toLowerCase()).includes(lowerCaseGenre)) {
    //         const html = await movieToHtml(movie);
    //         movieHtmlArray.push(html);
    //     }
    // }

    // return Promise.all(movieHtmlArray);
}





function renderMovies() {
    moviesToHtml().then((movieHtmlArray) => {
        movieContainer.innerHTML = `<div class="row">\n${movieHtmlArray.join("\n")}\n</div>`;
    });
}

function renderByGenreMedia(genre) {
    
    moviesByGenreToHtml(genre).then((movieHtmlArray) => {
        document.getElementById(genre+"MovieList").innerHTML = `<div class="row">\n${movieHtmlArray.join("\n")}\n</div>`;
    });
}

function renderByType(type){

}




async function mediasToHtml() {
    let medias=readMyList()._mediaProxies;
    const mediaHtmlArray = medias.map(async (media) => {
        const html = await mediaMyListToHtml(media);
        return html;
    });


    return Promise.all(mediaHtmlArray);
}


function renderMyList() {
    let medias=readMyList()._mediaProxies;
    mediasToHtml().then((movieHtmlArray) => {
        if(movieHtmlArray.length>0){
            myListContainer.innerHTML = `<div class="row">\n${movieHtmlArray.join("\n")}\n</div>`;
        }else{
            myListContainer.innerHTML = `<div class="row">Aún no añades nada a tu lista</div>`;
        }
        

   
    });
}



function watchingToHtml() {
    let medias=readMyWatching();
    const mediaHtmlArray = medias.map(async (media) => {
        const html = await mediaWatchingListToHtml(media.media,media.progress);
        return html;
    });
    return Promise.all(mediaHtmlArray);
}

function renderContinueWatichingList(){
    watchingToHtml().then((movieHtmlArray) => {
        if(movieHtmlArray.length>0){
            continueWatichingListContainer.innerHTML = `<div class="row">\n${movieHtmlArray.join("\n")}\n</div>`;
        }else{
            continueWatichingListContainer.innerHTML = `<div class="row">Ve alguna pelicula o serie</div>`;
        }
        
    });
}


function preloadStream() {
    renderMovies();
}

document.addEventListener('DOMContentLoaded', function() {
    preloadStream();
    renderMyList();
    renderContinueWatichingList();
    renderByGenreMedia("action");
    renderByGenreMedia("romance");
    renderByGenreMedia("drama");
});