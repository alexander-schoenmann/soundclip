"use strict";

import SongList from "../../classes/class.songList.js";
import PodcastList from "../../classes/class.podcastList.js";
import Comment from "../../classes/class.comment.js";

//API Link
const api_root = "https://api.s1910456030.student.kwmhgb.at/wp-json/wp/v2/";

export default class KWM_Model{

    constructor() {
        if(window.localStorage.getItem("favourite_songs") == null){
            window.localStorage.setItem("favourite_songs", "[]");
        }
        if(window.localStorage.getItem("favourite_podcasts") == null){
            window.localStorage.setItem("favourite_podcasts", "[]");
        }
    }


    //lädt alle Songs
    async getSongList(){
        return new Promise(resolve => {
            fetch(api_root+"kwm_song" + "?per_page=100")
                .then(response=>response.json())
                .then(data=>{
                    let songs = []
                    for(let song of data)
                        songs.push(new SongList(song.id, song.acf));
                    resolve(songs);
                })
        })
    }

    /*
    //lädt alle Songs
    async getSongList() {
        return new Promise(resolve => {
            fetch(api_root + "kwm_song" + "?per_page=4")
                .then(function (response) {
                    console.log(response);
                    paginate(response.headers.get("X-WP-TotalPages"));
                    return response;
                })
                .then(response => response.json())
                .then(data => {
                    let songs = [];
                    for (let song of data) {
                        songs.push(new SongList(song.id, song.acf));
                    }
                    resolve(songs);
                });
        });


        function paginate(totalPages) {
            if(totalPages > 1){
                let button = document.createElement("button");
                let div_container = document.createElement("div");
                div_container.classList.add("paginateButton")

                button.id = "load_more_posts";
                button.innerHTML = "Mehr laden!";
                button.dataset.totalPages = totalPages;
                button.dataset.nextPage = 2;
                button.addEventListener("click", function (){
                    fetch(api_root + "kwm_song"+ "?per_page=4&page="+this.dataset.nextPage)
                        .then(response => response.json())
                        .then(songs => {
                            //renderPosts(posts);

                            let song_container = document.querySelector(".songList");

                            for(let song of songs){
                                let new_div = document.createElement("div");
                                new_div.classList.add("song");
                                song_container.append(new_div);
                                new SongList(song.id, song.acf).renderListMarkup(new_div);
                            }
                            button.dataset.nextPage++;
                        });
                });
                div_container.append(button);
                document.querySelector("#kwm-body").append(div_container);
            }
        }
    }
     */

    //gibt einen Song über die ID zurück
    async getSongDetail(id){
        return new Promise(resolve => {
            fetch(api_root+"kwm_song/"+id).then(response => response.json())
                .then(song => {
                    resolve(new SongList(song.id, song.acf));
                })
        })
    }

    //für die Favoritensongs
    async getFavouriteSongs(){
        // let favourites = JSON.parse(window.localStorage.getItem("favourite_songs"));
        //let songs = await this.getSongListFavourite();
        let songs = await this.getSongList();
        return new Promise( resolve => {
            let favourite_songs = [];
            for (let song of songs){
                if(window.Core.model.isFavourite("songs", song.id)){
                    favourite_songs.push(song);
                }

            }
            resolve(favourite_songs);
        })
    }

    //lädt alle Podcasts
    async getPodcastList(){
        return new Promise(resolve => {
            fetch(api_root+"kwm_podcast" + "?per_page=100")
                .then(response=>response.json())
                .then(data=>{
                    let podcasts = []
                    for(let podcast of data)
                        podcasts.push(new PodcastList(podcast.id, podcast.acf));
                    resolve(podcasts);
                })
        })
    }

    /*
    //lädt alle Podcasts
    async getPodcastList(){
        return new Promise(resolve => {
            fetch(api_root + "kwm_podcast" + "?per_page=4")
                .then(function (response) {
                    console.log(response);
                    paginate(response.headers.get("X-WP-TotalPages"));
                    return response;
                })
                .then(response=>response.json())
                .then(data=>{
                    let podcasts = []
                    for(let podcast of data)
                        podcasts.push(new PodcastList(podcast.id, podcast.acf));
                    resolve(podcasts);
                });
        });

        function paginate(totalPages) {
            if(totalPages > 1){
                let button = document.createElement("button");
                let div_container = document.createElement("div");
                div_container.classList.add("paginateButton")

                button.id = "load_more_posts";
                button.innerHTML = "Mehr laden!";
                button.dataset.totalPages = totalPages;
                button.dataset.nextPage = 2;
                button.addEventListener("click", function (){
                    fetch(api_root + "kwm_podcast"+ "?per_page=4&page="+this.dataset.nextPage)
                        .then(response => response.json())
                        .then(podcasts => {
                            //renderPosts(posts);

                            let podcast_container = document.querySelector(".podcastList");

                            for(let podcast of podcasts){
                                let new_div = document.createElement("div");
                                new_div.classList.add("podcast");
                                podcast_container.append(new_div);
                                new PodcastList(podcast.id, podcast.acf).renderListMarkup(new_div);
                            }
                            button.dataset.nextPage++;
                        });
                });
                div_container.append(button);
                document.querySelector("#kwm-body").append(div_container);
            }
        }
    }
     */

    //gibt einen Podcast über die ID zurück
    async getPodcastDetail(id){
        return new Promise(resolve => {
            fetch(api_root+"kwm_podcast/"+id).then(response => response.json())
                .then(podcast => {
                    resolve(new PodcastList(podcast.id, podcast.acf));
                })
        })
    }

    //für die Favoritenpodcasts
    async getFavouritePodcasts(){
        // let favourites = JSON.parse(window.localStorage.getItem("favourite_podcasts"));
        //let podcasts = await this.getPodcastListFavourite();
        let podcasts = await this.getPodcastList();
        return new Promise( resolve => {
            let favourite_podcasts = [];
            for (let podcast of podcasts){
                if(window.Core.model.isFavourite("podcasts", podcast.id)){
                    favourite_podcasts.push(podcast);
                }

            }
            resolve(favourite_podcasts);
        })
    }



    async addCommentToPost(id, comment) {
        console.log(comment);
        return new Promise(resolve => {
            fetch("https://api.s1910456030.student.kwmhgb.at/wp-json/wp/v2/comments?post=" + id, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },
                body: JSON.stringify(comment)
            }).then(function (response) {
                if (response.status != 201) {
                    alert("Fehlgeschlagen: " + response.message);
                    console.error(response);
                    return false;
                }
                return response;
            }).then(response => response.json())
                .then(posts => {
                    if (window.Core.system.debugMode)
                        console.log(posts);
                    window.Core.router.changeView();
                });
        });
    }

    async getCommentsbyPost(id) {
        console.log("ID: " +id);
        return new Promise(resolve => {
            fetch(api_root + "comments?post=" + id).then(response => response.json())
                .then(data => {
                    //console.log(data);
                    let comments = [];
                    for (let comment of data) {
                        comments.push(new Comment(comment.id, comment.author_name, comment.date, comment.content.rendered));
                    }
                    resolve(comments);
                });
        });
    }

    //fragt ob es sich um einen Favouriten handelt
    isFavourite(type, id){
        let favourites = JSON.parse( window.localStorage.getItem("favourite_"+type) );
        return ( favourites.includes(id));
    }

    //wechselt status von Favouriten
    // hinzufügen oder rausgeben
    toggleFavourite(type, id){
        let favourites = JSON.parse(window.localStorage.getItem("favourite_"+type) );
        let index = favourites.indexOf(id);
        if(index==-1){
            favourites.push(id);
        }else{
            favourites.splice(index, 1);
            //window.Core.router.changeView();
        }
        window.localStorage.setItem("favourite_"+type, JSON.stringify(favourites));
    }

    async register() {
        let credentials = {
            username: document.getElementById("register-username").value,
            password: document.getElementById("register-password").value,
            email: document.getElementById("register-email").value
        };
            fetch("https://api.s1910456030.student.kwmhgb.at/wp-json/wp/v2/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(credentials)
            }).then(function (response) {
                if (response.status != 200) {
                    //alert("Fehlgeschlagen: " + response.message);
                    document.getElementById("register-username").classList.add("wrong");
                    document.getElementById("register-password").classList.add("wrong");
                    document.getElementById("register-email").classList.add("wrong");
                    //console.error(response);
                    return false;
                }
                return response;
            }).then(response => response.json())
                .then(response => {
                    window.location.hash = "/login";
                    return true;

                });
    }

    async notification() {
        console.log("Notification...");
        const notif_title = "Login successfull!";
        const notif_body = "Your are logged in as " + window.localStorage.getItem("user_display_name");
        const notif_img = "../../../img/icons/icon-128x128.png";
        const options = {
            body: notif_body,
            icon: notif_img
        };

        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(notif_title, options);
        });

        //new Notification(notif_title, options);
    }




}