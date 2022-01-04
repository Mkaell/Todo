import { Component } from "../core/component";
import { Form } from "../core/form";
import { Validators } from "../core/validators";
import { apiService } from "../services/app.service";

class CreateComponent extends Component{
    constructor(id) {
        super(id);    
    }
    init(){
        this.$el.addEventListener('submit', submitHandler.bind(this));
        this.form = new Form(this.$el, {
            title: [Validators.required], //Passing a link to the static validation method
            fulltext: [Validators.required, Validators.minLength(8)] // Passing a links to the static validation methods
         });
    }
}

async function submitHandler(event){
    event.preventDefault();
    
    if (this.form.isValid()) {
        const formData = {
            // The value of select and date
            type: this.$el.type.value,
            date: new Date().toLocaleDateString(),
    
            //Converting all data into one object(title, fulltext)
            ...this.form.value(),
        };
    
        await apiService.createPost(formData);
        this.form.clear();

        let modal = document.querySelector("#modal");
        let span = document.querySelector(".close");
        openAndCloseModal(span, window, modal);
    }
    
}

function openAndCloseModal(span, window, modal) {
    // When the user clicks on the button, open the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    };
}

export {CreateComponent};
