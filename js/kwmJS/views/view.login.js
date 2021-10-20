"use strict";

import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/login", async function(){ //wird von view.config und view.home benötigt
    await this.rendering();
});

view.rendering = async function() {

    await KWM_View.renderTemplate("empty", document.getElementById("kwm-header")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await
    await KWM_View.renderTemplate("login", document.getElementById("kwm-body")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await
    await KWM_View.renderTemplate("empty", document.getElementById("kwm-footer")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await

    /*
    let button = document.getElementById("login-submit").addEventListener("click", function (e){
        e.preventDefault();
        window.location.hash = window.Core.router.homeRoute.slug; //startseite wird aufgerufen
    });
     */

    //Login
    document.getElementById("login-submit").addEventListener("click", function (e) {
        e.preventDefault();

        if (window.localStorage.getItem("token")) {
            //Bin eingeloggt
            //user_display_name.innerHTML = "Willkommen zurück, " + window.localStorage.getItem("user_display_name") + "!";
            //frm_login.style.display = "none";
            window.location.hash = window.Core.router.routes[0].slug; //startseite wird aufgerufen
        } else {
            //Bin nicht eingeloggt
            let credentials = {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            };
            fetch("https://api.s1910456030.student.kwmhgb.at/wp-json/jwt-auth/v1/token", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            }).then(function (response) {
                if (response.status != 200) {
                    //alert("Fehlgeschlagen! " + response.status);
                    document.getElementById("username").classList.add("wrong");
                    document.getElementById("password").classList.add("wrong");
                    //console.log(response);
                    return false;
                }
                return response;
            }).then(response => response.json())
                .then(response => {
                    window.localStorage.setItem("token", response.token);
                    window.localStorage.setItem("user_display_name", response.user_display_name);
                    login - username.classList.remove("wrong");
                    login - password.classList.remove("wrong");
                    //login_state.classList.remove("red");
                    //user_display_name.innerHTML = "Willkommen zurück, " + window.localStorage.getItem("user_display_name") + "!";
                    //frm_login.style.display = "none";
                    window.location.hash = window.Core.router.routes[0].slug; //startseite wird aufgerufen
                    console.log("Jaaaa");
                    Notification.requestPermission().then((result) => {
                        console.log("Result: " + result);
                        if(result == 'granted') {
                            window.Core.model.notification();
                        }
                    });

                });
        }
    });

    //Registration
    document.getElementById("register").addEventListener("click", function (e) {
        e.preventDefault();
        window.location.hash = window.Core.router.routes[7].slug; //startseite wird aufgerufen
    });
}

