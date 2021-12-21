import { Component } from "../core/component";
import { Form } from "../core/form";

export class CreateComponent extends Component{
    constructor(id) {
        super(id);    
    }
    init(){
        this.$el.addEventListener('submit', submitHandler.bind(this));
        this.form = new Form(this.$el, {
            title: [],
            fulltext: []
         });
    }
}

function submitHandler(event){
    event.preventDefault();
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