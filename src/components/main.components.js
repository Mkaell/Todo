import { Component } from "../core/component";
import { apiService } from "../services/app.service";

class MainComponent extends Component{
    constructor(id) {
        super(id);    
    }
    init(){
        if(JSON.parse(localStorage.getItem('visited'))){
            this.hide();
            secondScreen.classList.remove('hide');
        }
        const BTN = this.$el.querySelector('.js-main-start');
        BTN.addEventListener('click', buttonHandler.bind(this));     
    }
}


const secondScreen = document.querySelector('.working-field');

async function buttonHandler(){
    localStorage.setItem('visited' , true);
    this.hide();
    secondScreen.classList.remove('hide');
    
    await apiService.deleteAllPosts();
}

export {MainComponent};
