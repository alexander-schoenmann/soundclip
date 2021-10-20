"use strict";
import KWM_Router from "./kwm-router.js";
import KWM_Utils from "./kwm-utils.js";
import KWM_View from "./kwm-view.js";
import KWM_Model from "./kwm-model.js";

/*****************************
 *
 *  Class Bundle for Web-Apps.
 *
 *  @param:
 *  config: contains webroot, appContainer, ...
 *
 *  Schönmann - 21-03-15
 *
 *****************************/


export default class KWM_App {
    constructor(config) {
        window.Core = this; //Attach Core ot window-Object.
        this.system = {
            appContainer: config.appContainer, //HTML-Element, where App will be rendered into
            webRoot: config.webRoot, //Root-URL of the App
            debugMode: config.debugMode //If activated, show debug log messages etc.
        };

        //Service Worker einbinden
        if('serviceWorker' in navigator){
            navigator.serviceWorker.register("../../../serviceworker.js")    // URL zum Serviceworker
                .then(function (){
                    console.log("Service worker registered");
                });
        }

        this.utils = new KWM_Utils();
        this.model = new KWM_Model();
        this.router = new KWM_Router(config.views);

        //this.initHeaderAndFooter();
    }

    /*
    async initHeaderAndFooter(){
        await KWM_View.renderTemplate("header", document.getElementById("kwm-header"));
        await KWM_View.renderTemplate("footer", document.getElementById("kwm-footer"));
    }
    */
    
}