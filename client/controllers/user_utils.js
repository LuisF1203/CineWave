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
            window.location.href = "/client/views/profiles.html";
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
    window.location.href = "/client/views/";
}






const logProfile = (name,img) => {
    console.log(name);
    console.log(img)
    //console.log(JSON.parse(sessionStorage.getItem("profileInfo")))
    //initMyNewProfile(name,img,sessionStorage.getItem("profileInfo")[name])
    //
    initMyNewProfile(name,img,JSON.parse(sessionStorage.getItem("profileInfo"))[name])
    window.open("/client/views/home.html","_self")
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
    if (titleLower.includes("login")) {
        console.log("You are on the login page");
        if(user){
            console.log("hay un usuario con sesión activa ", user)
            window.open("/client/views/profiles.html","_self")
        }
    }else{
        if(!user){
            console.log("no hay un usuario con sesión activa ", user)
            window.open("/client/views/","_self")
        }
    }
}

async function createProfile(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const userImg = event.target.userImg.files[0];
    const blobUrl = URL.createObjectURL(userImg);
    const userEmail = JSON.parse(sessionStorage.getItem('user'))._email;
    console.log(userEmail)

    if (!username || !userImg) {
        alert('Username and image are required.');
        return;
    }

    
    try {
        // Hacer una solicitud para agregar el nuevo perfil
        const response = await fetch(apiURL + 'users/'+`${userEmail}/` + 'profiles/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profileId: username,
                _imagen: blobUrl,
                // Agrega otros campos según sea necesario
            }),
        });
        console.log(response)
        if (response.ok) {
            alert('Perfil creado con éxito.');
            loadUserInfo().then(()=>{
                window.location.href="/client/views/profiles.html"
            })

            
        } else {

            alert('Error al crear el perfil.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor.');
    }
}


// Define la función para eliminar un perfil
async function deleteProfile(event) {
    event.preventDefault();
    const email = JSON.parse(sessionStorage.getItem('user'))._email;
    const profileId =  JSON.parse(localStorage.getItem('profile')).id    
    console.log(email)
    console.log(profileId)
    const deleteProfileURL = `${apiURL}users/${email}/profiles/${profileId}`;
    try {

        // Hace la solicitud DELETE para eliminar el perfil
        const response = await fetch(deleteProfileURL, {
            method: 'DELETE',
        });

        // Verifica si la solicitud fue exitosa (código de estado 204)
        if (response.ok) {
            console.log('Perfil eliminado con éxito.');
            localStorage.removeItem('profile');
            window.location.href="/client/views/profiles.html"
        } else {
            console.log('Error al eliminar el perfil.');
        }
    } catch (error) {
        console.error('Error:', error);
        console.log('Error al conectarse con el servidor.');
    }
}





document.addEventListener('DOMContentLoaded', function() {
    renderProfiles();
    loadUserInfo();
    onUser();
});
