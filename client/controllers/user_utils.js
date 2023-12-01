const userContainer = document.getElementById('myProfiles');




async function logIn(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        const response = await fetch(loginURL,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const user = await response.json();
            sessionStorage.setItem("user", JSON.stringify(user));
            console.log("Login successful:", user);
            window.location.href = " views/profiles.html";
        } else if (response.status === 401) {
            alert("Credenciales incorrectas.");
        } else {
            alert("Error al iniciar sesión.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Error de conexión con el servidor.");
    }
}

function logOut(){
    sessionStorage.removeItem('myList');
    sessionStorage.removeItem('user');
    
    localStorage.removeItem('profile');
    localStorage.removeItem('Watching');
    sessionStorage.removeItem('profileInfo');
    window.location.href = "/";
}






const logProfile = (name,img) => {
    console.log(name);
    console.log(img)
    //console.log(JSON.parse(sessionStorage.getItem("profileInfo")))
    //initMyNewProfile(name,img,sessionStorage.getItem("profileInfo")[name])
    //
    initMyNewProfile(name,img,JSON.parse(sessionStorage.getItem("profileInfo"))[name])
    window.location.href = "/views/home.html";
};




async function userToHtml(user) {
    const profileKeys = Object.keys(user.profiles || {});
    const buttonContainer = document.querySelector('.add-profile-link');
    if (profileKeys.length >= 4) {
        buttonContainer.style.display = 'none';
    }
    //console.log(profileKeys.length)
    //alert(profileKeys.length)
    //console.log(profileKeys)
    //console.log(user)

    const profileHtmlArray = profileKeys.map((profileKey) => {
        const profile = user.profiles[profileKey];
        sessionStorage.setItem("profileInfo",JSON.stringify(user.profiles))
        return `
            <div class="profile-n">
                <button onclick="logProfile('${profileKey}' , '${profile._imagen}')">
                    <img src="${profile._imagen}" alt="">
                    <p>${profileKey}</p>
                </button>
            </div>
        `;
    });

    return profileHtmlArray.join('');
}


function renderProfiles() {
    profilesToHtml().then((userHtml) => { // userHtml en lugar de userHtmlArray, ya que parece que solo hay un usuario
        userContainer.innerHTML = userHtml; // Ya no necesitas join, ya que solo hay un elemento
    });
}

async function profilesToHtml() {
    // Aquí asumo que solo estás cargando un perfil a la vez desde sessionStorage
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
        return await userToHtml(user); // Devuelve directamente el HTML del usuario
    } else {
        // Manejar el caso en que no hay un usuario almacenado
        console.log("No user found in sessionStorage.");
        return '';
    }
}


async function loadUserInfo() {
    const users = await loadUser(usersURL);
    console.log(users)

}



function onUser() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const titleLower = document.title.toLowerCase();

    console.log(titleLower);
    if (titleLower.includes("login") || titleLower.includes("register")) {
        console.log("You are on the login or register page");
        if (user) {
            console.log("There is a user with an active session ", user);
            window.open("/views/profiles.html", "_self");
        }
    } else {
        if (!user) {
            console.log("There is no user with an active session ", user);
            window.open("/", "_self");
        }
    }
}
















async function createProfile(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const userImg = event.target.userImg.files[0];
    const userEmail = JSON.parse(sessionStorage.getItem('user'))._email;

    console.log(username);

    // Verifica si se seleccionó una imagen
    if (userImg) {
        const reader = new FileReader();

        reader.onload = async function (event) {
            try {
                // El contenido de result es la representación base64 de la imagen
                const base64Image = event.target.result;

                // Función para redimensionar la imagen
                function resizeImage(base64, maxWidth, maxHeight) {
                    return new Promise((resolve, reject) => {
                        const img = new Image();

                        img.onload = function () {
                            let width = img.width;
                            let height = img.height;

                            // Verificar si la imagen necesita ser redimensionada
                            if (width > maxWidth || height > maxHeight) {
                                // Calcular nuevos tamaños proporcionales
                                const ratio = Math.min(maxWidth / width, maxHeight / height);
                                width *= ratio;
                                height *= ratio;
                            }

                            // Crear un elemento canvas para la redimensión
                            const canvas = document.createElement('canvas');
                            canvas.width = width;
                            canvas.height = height;

                            // Dibujar la imagen en el canvas
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0, width, height);

                            // Obtener la representación base64 de la imagen redimensionada
                            const resizedBase64 = canvas.toDataURL('image/jpeg');

                            // Resolver la promesa con la imagen redimensionada
                            resolve(resizedBase64);
                        };

                        img.onerror = function (error) {
                            reject(error);
                        };

                        // Asignar la representación base64 a la imagen
                        img.src = base64;
                    });
                }

                // Redimensionar la imagen antes de enviarla al servidor
                const resizedImage = await resizeImage(base64Image, 300, 300);

                // Hacer una solicitud para agregar el nuevo perfil con la imagen redimensionada
                const response = await fetch(apiURL + 'users/' + `${userEmail}/` + 'profiles/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        profileId: username,
                        _imagen: resizedImage,
                        // Agrega otros campos según sea necesario
                    }),
                });

                console.log(response);

                if (response.ok) {
                    // Obtener el objeto 'profiles' del usuario en sessionStorage
                    const user = JSON.parse(sessionStorage.getItem('user')) || {};
                    const profiles = user.profiles || {};

                    // Agregar el nuevo perfil al objeto 'profiles'
                    profiles[username] = {
                        _imagen: base64Image,
                        // Agrega otros campos según sea necesario
                    };

                    // Actualizar el objeto 'profiles' en el usuario en sessionStorage
                    user.profiles = profiles;
                    sessionStorage.setItem('user', JSON.stringify(user));

                    alert('Perfil creado con éxito.');
                    loadUserInfo().then(() => {
                        window.location.href = "/views/profiles.html";
                    });
                } else {
                    alert('Error al crear el perfil.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error de conexión con el servidor.');
            }
        };

        // Lee la imagen como una cadena base64
        reader.readAsDataURL(userImg);
    } else {
        console.log('No se seleccionó ninguna imagen.');
    }
}



















// Define la función para eliminar un perfil
async function deleteProfile(event) {
    event.preventDefault();

    try {
        // Obtén el email del usuario del sessionStorage
        const email = JSON.parse(sessionStorage.getItem('user'))._email;

        // Obtén el profileId del localStorage
        const profileId = JSON.parse(localStorage.getItem('profile')).id;

        // Obtén los perfiles del sessionStorage
        const profiles = JSON.parse(sessionStorage.getItem('profileInfo'));

        // Verifica si el profileId existe en los perfiles antes de hacer la solicitud DELETE
        if (!profiles.hasOwnProperty(profileId)) {
            console.log('El perfil que intentas eliminar no existe en los perfiles.');
            return;
        }

        const deleteProfileURL = `${apiURL}users/${email}/profiles/${profileId}`;

        // Hace la solicitud DELETE para eliminar el perfil
        const response = await fetch(deleteProfileURL, {
            method: 'DELETE',
        });

        // Verifica si la solicitud fue exitosa (código de estado 204)
        if (response.ok) {
            console.log('Perfil eliminado con éxito.');

            // Elimina el perfil del objeto profiles
            delete profiles[profileId];

            // Actualiza el sessionStorage con los perfiles actualizados
            sessionStorage.setItem('profileInfo', JSON.stringify(profiles));

            // Elimina el perfil del objeto user.profiles
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (user && user.profiles) {
                delete user.profiles[profileId];
                sessionStorage.setItem('user', JSON.stringify(user));
            }

            localStorage.removeItem('profile');
            alert('Perfil borrado exitosamente.');
            window.location.href = "/views/profiles.html";
        } else {
            console.log('Error al eliminar el perfil.');
        }
    } catch (error) {
        console.error('Error:', error);
        console.log('Error al conectarse con el servidor.');
    }
}


async function SignUp(event) {
    event.preventDefault();
    const nombre = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    if (!nombre || !email || !password) {
        alert('Nombre, email, and password are required.');
        return;
    }

    try {
        // Hacer una solicitud para agregar el nuevo usuario
        const response = await fetch(apiURL + 'user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _nombre: nombre,
                _email: email,
                _password: password,
                profiles:{}
            }),
        });

        console.log(response);
        
        if (response.ok) {
            const responseData = await response.json(); // espera la respuesta JSON
            console.log(responseData)
            sessionStorage.setItem('user',JSON.stringify(responseData))
            alert('Usuario creado con éxito.');
            window.location.href='profiles.html'
            // Puedes realizar acciones adicionales aquí si es necesario
        } else {
            alert('Error al crear el usuario.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor.');
    }
}   





document.addEventListener('DOMContentLoaded', function() {
    renderProfiles();
    loadUserInfo();
    onUser();
});
