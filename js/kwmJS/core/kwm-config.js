"use strict"; //sorgt dafür, dass wir nur Code einbauen können, der funktioniert (z.B. Variable muss mit let definiert werden)
import KWM_App from "./kwm-core.js";

//Import and rename your views here:
import {view as home} from '../views/view.home.js'; //erste ist automatisch die Startseite
import {view as login} from '../views/view.login.js';
import {view as song} from '../views/view.song.js';
import {view as podcast} from '../views/view.podcast.js';
import {view as songList} from '../views/view.songList.js';
import {view as podcastList} from '../views/view.podcastList.js';
import {view as favourites} from '../views/view.favourites.js';
import {view as registration} from '../views/view.register.js';
import {view as contact} from '../views/view.contact.js';

let config = {
    appContainer: "kwmJS",
    debugMode: false,
    webRoot: "https://app.s1910456030.student.kwmhgb.at/",
    views: [home, login, song, podcast, songList, podcastList, favourites, registration, contact]
}

new KWM_App(config); //Actually initialize the Application, deshalb muss die config Datei in der index verlinkt werden