import { Component } from "../core/component";
import { Form } from "../core/form";
import { Validators } from "../core/validators";
import { apiService } from "../services/app.service";

export class CreateComponent extends Component{
    constructor(id) {
        super(id);    
    }
    init(){
        this.$el.addEventListener('submit', submitHandler.bind(this));
        this.form = new Form(this.$el, {
            title: [Validators.required], // Передаем ссылку на статический метод
            fulltext: [Validators.required, Validators.minLength(8)] // Передаем ссылку на статический метод
         });
    }
}

async function submitHandler(event){
    event.preventDefault();
    
    if (this.form.isValid()) {
        const formData = {
            // Значение select и date
            type: this.$el.type.value,
            date: new Date().toLocaleDateString(),
    
            //Конвертируем все данные в один объект(title, fulltext)
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
