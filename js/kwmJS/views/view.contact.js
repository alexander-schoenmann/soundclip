"use strict";

import KWM_View from "./../core/kwm-view.js";

// legt neue View an
// async funition ist das init --> lädt das Template
export let view = new KWM_View("/contact", async function (){
    await this.rendering();
    //markup ist nun gerendert
});


// rendert ein Template raus
view.rendering = async function(){

    await KWM_View.renderTemplate("header", document.getElementById("kwm-header")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await
    await KWM_View.renderTemplate("contact", document.getElementById("kwm-body"));
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
    

}