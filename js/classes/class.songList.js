"use strict";

import KWM_View from "../kwmJS/core/kwm-view.js";

export default class SongList{

    constructor(id, song) {
        Object.assign(this, song);
        this.id = id;
    }

    //Ausgabe der Songs als ListOverview
    renderListMarkup(container){
        let self = this;

        KWM_View.renderTemplate("song.list", container, {
            //Inhalt vom Song Object
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

    //Ausgabe eines Songs
    renderSingleMarkup(container){
        let self = this;
        KWM_View.renderTemplate("song.single", container, {
            //Inhalt vom Song Object
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
        let fav_button = document.querySelectorAll(".favourite.mysong[data-id='"+id+"']")[0];
        if(window.Core.model.isFavourite("songs", id)){
            fav_button.classList.add("is_favourite");
        }
        fav_button.addEventListener("click", function (e){
            e.preventDefault();
            window.Core.model.toggleFavourite("songs", id);
            fav_button.classList.toggle("is_favourite");
        })

    }


}