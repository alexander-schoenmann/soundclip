"use strict";

import KWM_View from "./../core/kwm-view.js";

//neue View anlegen
export let view = new KWM_View("/songList", async function(){

    if(window.Core.utils.isEmpty(KWM_View.getGetParameters().id)){
        window.location.hash = "/songs";
    }
    else{
        this.songList = await window.Core.model.getSongDetail(KWM_View.getGetParameters().id);
        if(this.songList == false){

        }
        else{
            await this.rendering(this.songList.id);

            let new_comment = document.querySelector(".sendComment");
            let that = this;
            new_comment.addEventListener("click", function () {

                let comment = {
                    content: document.querySelector(".newComment").value
                };
                window.Core.model.addCommentToPost(that.songList.id, comment);
            });

        }
    }
});

view.rendering = async function(id){
    await KWM_View.renderTemplate("header", document.getElementById("kwm-header")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await
    await this.songList.renderSingleMarkup(document.getElementById("kwm-body")); //await geht nur wenn function async ist -> wartet auf ergebnis (promise) hinter await
    let comments = await window.Core.model.getCommentsbyPost(id);
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

    let comment_container = document.getElementById("comments");
    //console.log(comments);
    for (let comment of comments){
        let div = document.createElement("div");
        div.classList.add("comment");
        //console.log(comment);
        comment_container.append(div);
        comment.renderListMarkup(div);

    }
    


}

    

