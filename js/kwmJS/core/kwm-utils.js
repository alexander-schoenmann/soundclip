"use strict";

/*
*
* Collector class for several useful functions
*
 */

export default class KWM_Utils{

    constructor() {}

    //Cookie Dauer in ms
    setCookie(name, value, days){
        let expires;
        if(days){
            let date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000)  );
            expires ="; expires="+ date.toGMTString();
        }
        else{
            expires = "";
        }

        document.cookie = name + "=" + value + expires + "; path=/";
    }

    getCookie(name){

        let nameEQ = name + "=",
            occurenceArray = document.cookie.split(";");

        for (let i = 0; i<occurenceArray.length; i++){
            let occurance = occurenceArray[i];
            while (occurance.charAt(0) === ' ') occurance = occurance.substring(1, occurance.length);
            if(occurance.indexOf(nameEQ) === 0) return occurance.substring(nameEQ.length, occurance.length);
        }
    }

    deleteCookie(name){
        this.setCookie(name, "", -1);
    }

    // checkt ob die Variable leer ist
    isEmpty(variable){

        if(Array.isArray(variable)){
            return (variable.length == 0);
        }
        else if (typeof variable == "object"){
            return (Object.entries(variable).length === 0 && variable.constructor === Object)
        }
        else{
            return (typeof variable === "undefined" || variable == null | variable =="");
        }
    }

}