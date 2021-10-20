import KWM_View from "../kwmJS/core/kwm-view.js";

export default class Comment{
    constructor(id, author, date, content) {
        this.id = id;
        this.author = author;
        this.date = date.replace("T", " - ");
        this.content = content;
    }
    renderListMarkup(container){
        //console.log(this);
        KWM_View.renderTemplate("comment.list", container,  {
            author: this.author,
            date: this.date,
            content: this.content,
            id: this.id,
        }).then(function (){
            return new Promise((resolve, reject) => {
                resolve();
            });
        });
    }
}