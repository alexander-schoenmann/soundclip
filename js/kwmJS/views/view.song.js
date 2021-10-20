"use strict";

import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/songs", async function (){
    await this.rendering(); //Markup is rendered -> ab jetzt können darauf Eventlistender gesetzt werden
    console.log("Rednering is done"); //Diese nachricht kommt nur, wenn rendering() fertig ist
});


view.rendering = async function() { //rendering heißt, ich möchte das gesamte Markup erstellen

    //home template kommt in element kwm-body
    await KWM_View.renderTemplate("header", document.getElementById("kwm-header")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await
    await KWM_View.renderTemplate("song", document.getElementById("kwm-body")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await
    await KWM_View.renderTemplate("footer", document.getElementById("kwm-footer")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await

    //for mobile navigation
    document.querySelector(".menu-toggle").addEventListener("click", function () {
        console.log("Mobile Navigation");

        let toggleNav = document.querySelector(".nav");
        if (toggleNav.classList.contains("mobile-nav")) {
            toggleNav.classList.remove("mobile-nav");
            this.classList.remove("is-active");
        } else {
            toggleNav.classList.add("mobile-nav");
            this.classList.add("is-active");
        }
    });

    //logout
    document.getElementById("logout").addEventListener("click", function (e) {
        e.preventDefault();
        if(window.localStorage.getItem("token")) {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("user_display_name");
        }
        window.location.hash = window.Core.router.routes[1].slug; //startseite wird aufgerufen
        //console.log("Slug: " + window.Core.router.routes[1].slug);
    });

    //dropdown filter
    let select_song = document.getElementById("selectSongCategory");
    select_song.addEventListener("change", function () {
        dropdown_filter();
    });

    //Songliste wird geladen
    let song_container = document.querySelector(".songList");
    let songs = await window.Core.model.getSongList();

    let all_songs_categories = [];

    for (let song of songs) {

        let div = document.createElement("div");
        div.classList.add("song");
        song_container.append(div);
        song.renderListMarkup(div);
        //console.log(song.category);
        all_songs_categories.push(capitalizeFirstLetter(song.category));
    }
    console.table(songs);

    let unique_song_categories = all_songs_categories.filter((v, i, a) => a.indexOf(v) === i);
    console.log("Verfügbaren Song Kategorien: " + unique_song_categories);

    //let select_song = document.getElementById("selectSongCategory");
    for(let i = 0; i < unique_song_categories.length; i++){
        let opt = unique_song_categories[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        document.getElementById("selectSongCategory").append(el);
    }



    //setTimeout(dropdown_filter, 3000);

    
}


async function dropdown_filter() {
    //category dropdown - view list by category
    console.log("Dropdown triggered");

    let song_container = document.querySelector(".songList");
    //console.log(song_container);

    for (let i = 0; i < song_container.children.length; i++) {
        //check, if child element from songs has the class song
        //if (song_container.children[i].classList.contains("song")) {
        let single_song = song_container.children[i];
        //console.log(single_song);

        //let single_song_category = single_song.querySelector(".category").innerHTML;


        for (let j = 0; j < single_song.children.length; j++) {
            if (single_song.children[j].classList.contains("category")) {
                let single_song_category = single_song.children[j];

                //compare category with dropdown value
                let current_song_selection = document.getElementById("selectSongCategory").value;
                if (current_song_selection.toLowerCase() === single_song_category.innerHTML.toLowerCase()) { //show song
                    //console.log("Yes -> " + current_song_selection.toLowerCase());
                    single_song_category.parentNode.classList.remove("hideSong");
                    single_song_category.parentNode.classList.add("showSong");
                } else {   //hide song
                    if(current_song_selection === "all"){
                        single_song_category.parentNode.classList.remove("hideSong");
                        single_song_category.parentNode.classList.add("showSong");
                    }
                    else {
                        single_song_category.parentNode.classList.remove("showSong");
                        single_song_category.parentNode.classList.add("hideSong");
                    }
                }

            }
        }



    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function reduceText(string, maxLength) {
    if (string.length > maxLength) {
        return string.slice(0, maxLength) + "...";
    }
    return string;
}
