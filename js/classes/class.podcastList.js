"use strict";

import KWM_View from "../kwmJS/core/kwm-view.js";

export default class PodcastList{

    constructor(id, podcast) {
        Object.assign(this, podcast);
        this.id = id;
    }

    //Ausgabe der Podcasts als ListOverview
    renderListMarkup(container){
        let self = this;

        KWM_View.renderTemplate("podcast.list", container, {
            //Inhalt vom Podcast Object
            id: this.id,
            title: this.title,
            author: this.author,
            image_url: this.image.url,
            category: this.category,
        }).then(function (){
            return new Promise((resolve, reject) => {
                self.addFavHandler(self.id);
                resolve();
            })
        });
    }

    //Ausgabe eines Podcasts
    renderSingleMarkup(container){
        let self = this;
        KWM_View.renderTemplate("podcast.single", container, {
            //Inhalt vom Podcast Object
            id: this.id,
            title: this.title,
            author: this.author,
            image_url: this.image.url,
            link: this.link,
            category: this.category,
            year: this.year,
            text: this.text
        }).then(function(){

            self.addFavHandler(self.id);

            return new Promise((resolve, reject) => {
                resolve();
            })
        })
    }

    // Handler für Favourite
    addFavHandler(id){
        let fav_button = document.querySelectorAll(".favourite.mypodcast[data-id='"+id+"']")[0];
        if(window.Core.model.isFavourite("podcasts", id)){
            fav_button.classList.add("is_favourite");
        }
        fav_button.addEventListener("click", function (e){
            e.preventDefault();
            window.Core.model.toggleFavourite("podcasts", id);
            fav_button.classList.toggle("is_favourite");
        })

    }

}