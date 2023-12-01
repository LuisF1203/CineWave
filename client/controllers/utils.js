"use strict";

//const apiURL = 'http://localhost:3000/api/';
const apiURL='http://localhost:3000/api/'
const moviesURL = apiURL + 'movies/';
const seriesURL = apiURL + 'series/';
const usersURL = apiURL + 'user/';
const loginURL = apiURL + 'login/';
const myListURL = apiURL + 'myList/';



function initMyList() {
    if(sessionStorage.getItem('myList') == null) {
        let media = new MediaContent();
        writeMyList(media);
    }
}

function readMyList() {
    let myList = JSON.parse(sessionStorage.getItem('myList'));




    if (myList === undefined) {
        myList = [];
    }
    return new MediaContent(myList._mediaProxies);
}

function readMyWatching() {
    let Watching = JSON.parse(localStorage.getItem('Watching'));
    if (Watching === null) {
        Watching = [];
    }
    return Watching;
    //return new MediaContent(myList._mediaProxies);
}


function writeMyList(media) {
    sessionStorage.setItem('myList', JSON.stringify(media));
}


async function addToMyList(media) {
    const myList = readMyList();
//
    //// Verificar si el título del nuevo elemento ya existe en la lista
    let isDuplicate = false;
    for (const item of myList._mediaProxies) {
        if (item.title === media.title) {
            isDuplicate = true;
            break;
        }
    }
//
    if (!isDuplicate) {
        myList._mediaProxies.push(media);
        writeMyList(myList);
    }
    renderMyList();


    //console.log(JSON.parse(sessionStorage.getItem("user")))
    //let userEmail=JSON.parse(sessionStorage.getItem("user"))._email;
    //let profile=JSON.parse(localStorage.getItem("profile")).id;
    //const response = await fetch(apiURL + 'users/' + `${userEmail}/` +  `${profile}/`+"mylist", {
    //    method: 'POST',
    //    headers: {
    //        'Content-Type': 'application/json',
    //    },
    //    body: JSON.stringify(media),
    //});
//
    //if (response.ok) {
    //    // La solicitud fue exitosa (código de estado HTTP 2xx)
    //    const responseData = await response.json();
    //    console.log(responseData);
    //} else {
    //    // La solicitud no fue exitosa (código de estado HTTP diferente de 2xx)
    //    console.error('Error en la solicitud:', response.status, response.statusText);
    //}
}

function deleteFromMyList(media) {
    const myList = readMyList();
    const updatedList = myList._mediaProxies.filter(m => m.title !== media.title);
    myList._mediaProxies = updatedList;
    writeMyList(myList);
    renderMyList();
}


function deleteFromWatching(media) {
    const watching = readMyWatching();

    for (let i = 0; i < watching.length; i++) {
        if (watching[i].media.title === media.title) {
            console.log("Pelicula encontrada");
            watching.splice(i, 1); // Remove the movie at index i
            localStorage.setItem("Watching", JSON.stringify(watching));
            
            setTimeout(() => {
                location.reload();
            }, 2000);
            return;
        }
    }

    console.log('Movie not found in the watching list');
}









async function saveProgressMedia(media, progress) {
    // Get the current "Watching" array from localStorage
    let watchingArray = JSON.parse(localStorage.getItem("Watching")) || [];

    // Check if the media is already in the array based on its title
    const existingMediaIndex = watchingArray.findIndex(item => item.media.title === media.title);

    if (existingMediaIndex !== -1) {
        // If the media is already in the array, update its progress
        watchingArray[existingMediaIndex].progress = progress;
    } else {
        // If the media is not in the array, add it along with the progress
        watchingArray.push({ media, progress });
    }

    // Save the updated array back to localStorage
    localStorage.setItem("Watching", JSON.stringify(watchingArray));

    let userEmail=JSON.parse(sessionStorage.getItem("user"))._email;
    let profile=JSON.parse(localStorage.getItem("profile")).id;


    const response = await fetch(apiURL + 'users/' + `${userEmail}/` +  `${profile}/`+"watching", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(watchingArray),
    });

}















function initMyNewProfile(username,img,profileInfo) {
    console.log(
        {
            id:username,
            img:img,
            info:(profileInfo)
        }
    )
    localStorage.setItem("profile",JSON.stringify(
        {
            id:username,
            img:img,
            info:(profileInfo)
        }
    ))

    let myNewList={
        "_mediaProxies":JSON.parse(localStorage.getItem("profile")).info._myList
    }
    console.log(myNewList)
    writeMyList(myNewList)

    // localStorage.setItem("profile",JSON.stringify(
    //     {
    //         id:username,
    //         img:img,
    //         info:(profileInfo)
    //     }
    // ))
    // let myNewList={
    //     "_mediaProxies":JSON.parse(localStorage.getItem("profile")).info._myList
    // }
    // writeMyList(myNewList)
    // console.log(JSON.parse(profileInfo))
    // console.log(myNewList)
    
}


function initProfile(){
    const user=JSON.parse(localStorage.getItem("profile"))
    const userProfileDiv=document.querySelector("#userProfileLink");

    console.log(user)

    userProfileDiv.innerHTML=`
    <img class="img-user" src="${user.img}">
        ${user.id}
    `
}



initProfile();
initMyList();