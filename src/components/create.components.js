import { Component } from "../core/component";
import { Form } from "../core/form";
import { Validators } from "../core/validators";

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

function submitHandler(event){
    event.preventDefault();
    
    if (this.form.isValid()) {
        const formData = {
            // Значение select и date
            type: this.$el.type.value,
            date: new Date().toLocaleDateString(),
    
            //Конвертируем все данные в один объект(title, fulltext)
            ...this.form.value(),
        };
    
        this.form.clear();
        console.log('submit', formData);
    }
    
}