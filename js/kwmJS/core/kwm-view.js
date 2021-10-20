"use strict";

/*************************
 * Hash-based Routes for Single-Page-Applications.
 * Routes can be treated like Views. Each Route is
 * therefore bound to one single (unique) view.
 *
 * Schönmann - 2021-03-15
 *************************/

export default class KWM_View{


    constructor(slug, init) { //slug ist der teil in der URL, dadurch weiß View wie sie heißt und kann aufgerufen werden -> macht Router
        this.slug = slug;
        this.init = init; //The init function, which is called, once the View is loaded.
    }


    isActive(){
        if(!window.Core.utils.isEmpty(KWM_View.getGetParameters())){
            let index = window.location.hash.substr(1).indexOf("?");
            return (window.location.hash.substr(1,index).replace('#', "") === this.slug)
        }else{
            return(window.location.hash.substr(1).replace('#', "") === this.slug);
        }
    }


    static renderTemplate(templateName, container, content = {}){ //static = hat nichts mit dem Objekt zu tun, nur mit Klasse, Funktion soll template in Container verschieben

        return new Promise((resolve, reject) => {
            fetch(window.Core.system.webRoot+"/js/kwmJS/templates/"+templateName+".tpl")
                .then(response => response.text())
                .then(tpl => { //tpl is content of .tpl file.


                    let markup = tpl,
                        open = /<%>/gi,
                        variables = /<&>/gi,
                        result,
                        indices_open = [],
                        variables_close = [],
                        variables_open = [],
                        indices_close = [],
                        even = true;

                    while(result = variables.exec(tpl)){
                        even ? variables_open.push(result.index) : variables_close.push(result.index);
                        even = !even;
                    }

                    //befüllen
                    for(let i = 0; i<variables_open.length; i++){
                        let value = content[tpl.substring(variables_open[i]+3, variables_close[i])];     // Zugriff wie bei einem array auch möglich  // wert der zw. den sonderzeichen ist ist zugriff
                        markup = markup.replace( tpl.substring(variables_open[i], variables_close[i]+3), value );
                    }

                    even = true

                    //Wörter rausholen      übersetzen
                    while( (result = open.exec(tpl)) ){
                        //wenn gerade geb ich den Tag in den entsp. Array
                        even ? indices_open.push(result.index) : indices_close.push(result.index);
                        even = !even;
                    }

                    //übersetzen der  Wörter
                    for(let i = 0; i<indices_close.length; i++){
                        // wort übersetzen --> zuerst rausholen
                        let word = window.Core.t( tpl.substring(indices_open[i]+3, indices_close[i]) );     //+3 weil <%> nicht dabei
                        //wort in das markup reingeben
                        markup = markup.replace( tpl.substring(indices_open[i], indices_close[i]+3), word );
                    }




                    if(window.Core.system.debugMode) {
                        console.log(tpl);
                    }

                    container.innerHTML = markup;
                    resolve();
                })
        })
    }


    static getGetParameters(){
        let index = window.location.hash.substr(1).indexOf("?");
        if(index != -1){
            let parameters = window.location.hash.substr(index+2);
            let result = parameters.split("&").reduce(function(result, item){
                let parts = item.split("=");
                result[parts[0]] = parts[1];
                return result;
            }, {});
            return result;
        } else
            return {};
    }


}