"use strict";

import KWM_View from './../core/kwm-view.js';

export let view = new KWM_View("/", async function (){
    await this.rendering(); //Markup is rendered -> ab jetzt können darauf Eventlistender gesetzt werden
    console.log("Rednering is done"); //Diese nachricht kommt nur, wenn rendering() fertig ist
});


view.rendering = async function(){ //rendering heißt, ich möchte das gesamte Markup erstellen

    //home template kommt in element kwm-body
    await KWM_View.renderTemplate("header", document.getElementById("kwm-header")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await
    await KWM_View.renderTemplate("home", document.getElementById("kwm-body")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await
    await KWM_View.renderTemplate("footer", document.getElementById("kwm-footer")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await

    //for mobile navigation
    document.querySelector(".menu-toggle").addEventListener("click", function () {
        console.log("Click on the Button");

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
        console.log("Slug: " + window.Core.router.routes[1].slug);
    });

    let username = window.localStorage.getItem("user_display_name");
    document.querySelector(".headlineUsername").innerHTML = "Hello " + username;

    let buttonSong = document.querySelectorAll(".feature-container")[0].addEventListener("click", function (e){
        e.preventDefault();
        console.log("Songseite");
        window.location.hash = window.Core.router.routes[2].slug; //songseite wird aufgerufen
    });

    let buttonPodcast = document.querySelectorAll(".feature-container")[1].addEventListener("click", function (e){
        e.preventDefault();
        console.log("Podcastseite");
        window.location.hash = window.Core.router.routes[3].slug; //podcastseite wird aufgerufen
    });





}