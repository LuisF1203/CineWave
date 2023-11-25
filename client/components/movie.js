let hideControlsTimeout;
let play = true;

function mostrarDetallePelicula(movie) {
    let movieTitle = movie.title;

    let watching=readMyWatching();
    let oldProgress=0;
    if (watching!=null){
        watching.forEach(media => {
            let m=media.media
            if(movieTitle==m.title){
                oldProgress=media.progress;
            }
        });
    }


    
    console.log(movie);
    saveProgressMedia(movie,0)
    const detallePelicula = `
        <div class="movie-container" onmousemove="mostrarControles()">

            <video src=${movie.video} autoplay></video>
            <div class="controls" style="display: none;">
                <button class="goBackdBtn" onclick="back()">
                    <img src="../assets/goBack.svg">
                </button>
                <ul>
                    <li>
                        <button onclick="retroceder()">
                            <img src="../assets/back.svg">
                        </button>
                    </li>
                    <li>
                        <button id="btnPoP" onclick="pausar()">
                            <img src="../assets/pause.svg">
                        </button>
                    </li>
                    <li>
                        <button onclick="avanzar()">
                            <img src="../assets/next.svg">
                        </button>
                    </li>
                </ul>
                <div class="bar">
                    <h2 id="movieTitle" class="movie-title">${movieTitle}</h2>
                    <div class="progress">
                        <input type="range" min="0" value="0" step="0.5">
                    </div>
                    <div class="info">
                        <p id="progressVideo"></p>

                        <div>
                            <input style="display:none" onmouseenter="mostrarSoundInput()" onmouseleave="ocultarSoundInput()" class="soundInput" name="soundInput" type="range" min="0" max="10" value="10" step="1" oninput="ajustarVolumen(this)">
                        </div>
                        <div class="settings">
                            <button id="fullscreenBtn" onclick="toggleFullscreen()">
                                <img src="../assets/fullscreen.svg">
                            </button>
                            <button id="soundBtn" onmouseenter="mostrarSoundInput()" onmouseleave="ocultarSoundInput()" onclick="alternarMuted()">
                                <img src="../assets/sound.svg">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    const detallePeliculaContainer = document.getElementById('detallePelicula');
    detallePeliculaContainer.innerHTML = detallePelicula;
    detallePeliculaContainer.style.display = 'block';
    detallePeliculaContainer.classList.add('open-movie');
    setTimeout(() => {
        detallePeliculaContainer.classList.add('open');
    }, 500);

    mostrarControles();

    setTimeout(() => {
        const video = document.querySelector('.movie-container video');
        const progresoElemento = document.getElementById('progressVideo');
        video.currentTime = oldProgress;
        
        video.addEventListener('timeupdate', () => {
            
            const tiempoActual = Math.floor(video.currentTime);
            const duracion = Math.floor(video.duration);
            const minutosD = Math.floor(duracion / 60);
            const segundosD = duracion % 60;
            const minutosT = Math.floor(tiempoActual / 60);
            const segundosT = tiempoActual % 60;

            progresoElemento.textContent = `${minutosT}:${segundosT} / ${minutosD}:${segundosD}`;
            console.log(movie)
            console.log(video.currentTime)
            saveProgressMedia(movie,video.currentTime)


            if((minutosT==minutosD)&&(segundosT==segundosD)){
                deleteFromWatching(movie)
            }

        });

    }, 200);
}

function back() {
    play = "exit";
    const detallePeliculaContainer = document.getElementById('detallePelicula');
    detallePeliculaContainer.classList.remove('open-movie');
    detallePeliculaContainer.classList.remove('open');
    detallePeliculaContainer.classList.add('close-movie');
    const video = document.querySelector('.movie-container video');
    video.pause();
}

function retroceder() {
    const video = document.querySelector('.movie-container video');
    video.currentTime -= 10;
    mostrarControles();
}

function avanzar() {
    const video = document.querySelector('.movie-container video');
    video.currentTime += 10;
    mostrarControles();
}

function pausar() {
    const video = document.querySelector('.movie-container video');
    const btn = document.getElementById('btnPoP');
    if (!video.paused) {
        video.pause();
        play = false;
        btn.innerHTML = '<img src="../assets/play.svg">';
    } else {
        play = true;
        video.play();
        mostrarControles();
        btn.innerHTML = '<img src="../assets/pause.svg">';
    }
}

function mostrarControles() {
    const controls = document.querySelector('.movie-container .controls');
    controls.style.display = 'flex';
    document.getElementById("detallePelicula").classList.remove('hide-cursor');

    function ocultarControles() {
        controls.style.display = 'none';
        document.getElementById("detallePelicula").classList.add('hide-cursor');
    }

    // Función para reiniciar el temporizador de ocultar controles y cursor
    function reiniciarTemporizador() {
        clearTimeout(hideControlsTimeout);
        hideControlsTimeout = setTimeout(ocultarControles, 3000);
    }

    // Al mover el ratón, mostrar controles y reiniciar el temporizador
    document.querySelector('.movie-container').addEventListener('mousemove', () => {
        controls.style.display = 'flex';
        document.getElementById("detallePelicula").classList.remove('hide-cursor');
        reiniciarTemporizador();
    });

    // Inicializar el temporizador
    reiniciarTemporizador();
}

function actualizarProgreso(elemento) {
    const video = document.querySelector('.movie-container video');
    console.log("tiempoActual")
    if (video) {
        const tiempoActual = video.currentTime;
        const duracion = video.duration;
        elemento.value = (100 / duracion) * tiempoActual;
        
    }
}

setInterval(() => {
    const video = document.querySelector('.movie-container video');
    const barraProgreso = document.querySelector('.movie-container input[type="range"]');
    if (video) {
        const tiempoActual = video.currentTime;
        const duracion = video.duration;
        barraProgreso.value = (100 / duracion) * tiempoActual;
        

        
    }
}, 1000);

function ajustarVolumen(elemento) {
    const video = document.querySelector('.movie-container video');
    if (video) {
        video.volume = elemento.value / 10;
    }
}

let isMuted = false;

function alternarMuted() {
    const video = document.querySelector('.movie-container video');
    const soundInput = document.querySelector('.soundInput');
    isMuted = !isMuted;
    video.muted = isMuted;

    isMuted ? soundInput.value = 0 : soundInput.value = (video.volume) * 10;
}

function toggleFullscreen() {
    const videoContainer = document.querySelector('.movie-container');

    if (!document.fullscreenElement) {
        // Entrar en modo de pantalla completa
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
        } else if (videoContainer.mozRequestFullScreen) { // Firefox
            videoContainer.mozRequestFullScreen();
        } else if (videoContainer.webkitRequestFullscreen) { // Chrome, Safari, Opera
            videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) { // IE/Edge
            videoContainer.msRequestFullscreen();
        }
    } else {
        // Salir del modo de pantalla completa
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Funciones para mostrar y ocultar soundInput al hacer hover sobre soundBtn
function mostrarSoundInput() {
    const soundInput = document.querySelector('.soundInput');
    soundInput.style.display = 'block';
}

function ocultarSoundInput() {
    const soundInput = document.querySelector('.soundInput');
    soundInput.style.display = 'none';
}
