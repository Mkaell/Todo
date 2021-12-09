import { Component } from "../core/component";

export class HeaderComponent extends Component{
    constructor(id) {
        super(id);    
    }
    init(){
        if(JSON.parse(localStorage.getItem('visited'))){
            this.hide();
            secondScreen.classList.remove('hide');
        }
        const BTN = this.$el.querySelector('.js-header-start');
        BTN.addEventListener('click', buttonHandler.bind(this));     
    }
}


const secondScreen = document.querySelector('.working-field');

function buttonHandler(){
    localStorage.setItem('visited' , true);
    this.hide();
    secondScreen.classList.remove('hide');
}
