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


function renderUsers() {
    usersToHtml().then((userHtmlArray) => {
        userContainer.innerHTML = userHtmlArray.join('');
    });
}

async function usersToHtml() {
    const users = await loadUser(usersURL);
    const userHtmlArray = users.map(async (user) => {
        const html = await userToHtml(user);
        return html;
    });

    return Promise.all(userHtmlArray);
}

async function loadUserInfo() {
    const users = await loadUser(usersURL);
    console.log(users)
}

function createProfile(el) {
    el.preventDefault();

    const username = el.target.username.value;
    const userImg = el.target.userImg.files[0];
    const parentalControl = el.target.parental.checked;

    if (!username || !userImg) {
        console.error('Username and image are required.');
        return;
    }

    // Crear una URL Blob para la imagen
    const blobUrl = URL.createObjectURL(userImg);

    // Resto del código de la función...
    console.log('Username:', username);
    console.log('User Image:', blobUrl);
    console.log('Parental Control:', parentalControl);
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





document.addEventListener('DOMContentLoaded', function() {
    renderUsers();
    loadUserInfo();
    onUser();
});
