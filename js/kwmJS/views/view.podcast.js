"use strict";

import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/podcasts", async function (){
    await this.rendering(); //Markup is rendered -> ab jetzt können darauf Eventlistender gesetzt werden
    console.log("Rednering is done"); //Diese nachricht kommt nur, wenn rendering() fertig ist
});


view.rendering = async function() { //rendering heißt, ich möchte das gesamte Markup erstellen

    //home template kommt in element kwm-body
    await KWM_View.renderTemplate("header", document.getElementById("kwm-header")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await
    await KWM_View.renderTemplate("podcast", document.getElementById("kwm-body")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await
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
    let select_podcast = document.getElementById("selectPodcastCategory");
    select_podcast.addEventListener("change", function () {
        dropdown_filter();
    });

    //Podcastliste wird geladen
    let podcast_container = document.querySelector(".podcastList");
    let podcasts = await window.Core.model.getPodcastList();

    let all_podcasts_categories = [];

    for (let podcast of podcasts) {

        let div = document.createElement("div");
        div.classList.add("podcast");
        podcast_container.append(div);
        podcast.renderListMarkup(div);
        //console.log(podcast.category);
        all_podcasts_categories.push(capitalizeFirstLetter(podcast.category));
    }
    console.table(podcasts);

    let unique_podcast_categories = all_podcasts_categories.filter((v, i, a) => a.indexOf(v) === i);
    console.log("Verfügbare Podcast Kategorien: " + unique_podcast_categories);

    //let select_podcast = document.getElementById("selectPodcastCategory");
    for(let i = 0; i < unique_podcast_categories.length; i++){
        let opt = unique_podcast_categories[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        document.getElementById("selectPodcastCategory").append(el);
    }



    //setTimeout(dropdown_filter, 3000);


}


async function dropdown_filter() {
    //category dropdown - view list by category
    console.log("Dropdown triggered");

    let podcast_container = document.querySelector(".podcastList");
    //console.log(podcast_container);

    for (let i = 0; i < podcast_container.children.length; i++) {
        //check, if child element from podcasts has the class podcast
        //if (podcast_container.children[i].classList.contains("podcast")) {
        let single_podcast = podcast_container.children[i];
        //console.log(single_podcast);

        //let single_podcast_category = single_podcast.querySelector(".category").innerHTML;

        for (let j = 0; j < single_podcast.children.length; j++) {
            if (single_podcast.children[j].classList.contains("category")) {
                let single_podcast_category = single_podcast.children[j];

                //compare category with dropdown value
                let current_podcast_selection = document.getElementById("selectPodcastCategory").value;
                if (current_podcast_selection.toLowerCase() === single_podcast_category.innerHTML.toLowerCase()) { //show podcast
                    //console.log("Yes -> " + current_podcast_selection.toLowerCase());
                    single_podcast_category.parentNode.classList.remove("hidePodcast");
                    single_podcast_category.parentNode.classList.add("showPodcast");
                } else {   //hide podcast
                    if(current_podcast_selection === "all"){
                        single_podcast_category.parentNode.classList.remove("hidePodcast");
                        single_podcast_category.parentNode.classList.add("showPodcast");
                    }
                    else {
                        single_podcast_category.parentNode.classList.remove("showPodcast");
                        single_podcast_category.parentNode.classList.add("hidePodcast");
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
