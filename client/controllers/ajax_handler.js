"use strict";

async function loadMedias (url) {
    let response = await fetch(url);
    if (response.status != 200) return [];
    return await response.json();
}

async function loadUser(url){
    let response = await fetch(url);
    if (response.status != 200) return [];
    return await response.json();
}
async function loadLogin(url){
    let response = await fetch(url);
    if (response.status != 200) return [];
    return await response.json();
}