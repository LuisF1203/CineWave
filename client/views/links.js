"use strict";

// Función para redirigir a la página de registro
function redirigirRegistro() {
    window.location.href = 'register.html';
}

// Función para manejar el envío del formulario
function manejarEnvioFormulario(formulario) {
    const action = formulario.getAttribute('action');

    // Redirigir según el valor del atributo action
    if (action) {
        window.location.href = action;
    } else {
        // Redirigir a una página por defecto si action no está definido
        window.location.href = 'profiles.html';
    }
}

// document.addEventListener('DOMContentLoaded', function() {
//     // Manejar el evento submit del formulario
//     const formulario = document.querySelector('form');
//     formulario.addEventListener('submit', function(event) {
//         event.preventDefault(); // Evitar que el formulario se envíe

//         // Llamar a la función de manejo de envío del formulario
//         manejarEnvioFormulario(this);
//     });

//     // Manejar el evento click del botón "Sign Up"
//     const signUpButton = document.querySelector('.sign-up');
//     signUpButton.addEventListener('click', redirigirRegistro);
// });


function goHome(){
     window.location.href = 'home.html';
}

function addProfile(){
    window.location.href = 'createProfile.html'
}