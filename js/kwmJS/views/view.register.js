"use strict";

import KWM_View from "./../core/kwm-view.js";

// legt neue View an
// async funition ist das init --> lädt das Template
export let view = new KWM_View("/register", async function (){
    await this.rendering();
    //markup ist nun gerendert
});


// rendert ein Template raus

view.rendering = async function registrationProcess(){

    await KWM_View.renderTemplate("empty", document.getElementById("kwm-header")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await
    await KWM_View.renderTemplate("register", document.getElementById("kwm-body"));
    await KWM_View.renderTemplate("empty", document.getElementById("kwm-footer")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await

    //Registration
    document.getElementById("doRegistration").addEventListener("click", function (e) {
        e.preventDefault();
        window.Core.model.register();
    });

    //cancel Registration
    document.getElementById("cancelRegister").addEventListener("click", function (e) {
        e.preventDefault();
        window.location.hash = window.Core.router.routes[1].slug; //login wird aufgerufen
    });

}