import { Component } from "../core/component";

export class HeaderComponent extends Component{
    constructor(id) {
        super(id);    
    }
    init(){
        const BTN = this.$el.querySelector('.js-header-start');
        BTN.addEventListener('click', buttonHandler.bind(this));     
    }
}
const secondScreen = document.querySelector('.working-field');
function buttonHandler(){
    this.hide();
    secondScreen.classList.remove('hide');
}
