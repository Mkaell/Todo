import { Component } from "../core/component";

import { PostsComponent } from "../components/posts.components";
import { CreateComponent } from "../components/create.components";
import { FavoriteComponent } from "../components/favorite.components";

const postsComponent = new PostsComponent('#posts');
const createComponent = new CreateComponent('#create');
const favoriteComponent = new FavoriteComponent('#favorite');



export class NavigationComponent extends Component{
    constructor(id) {
        super(id);
        this.tabs = []; 
        this.content();   
    }
    content(){
        this.tabs.push(postsComponent.$el);
        this.tabs.push(createComponent.$el);
        this.tabs.push(favoriteComponent.$el);
        console.log(this.tabs);
    }
    init(){
        this.$el.addEventListener('click', tabClickHandler.bind(this));
    }  
}

function tabClickHandler(event){
    event.preventDefault();
    const TABS = Array.from(this.$el.querySelectorAll('.navigation__link'));
    const target = event.target;
    let currTab = target.dataset.tab;
    
    TABS.forEach(elem => { 
        elem.classList.remove('active');
    });
    target.classList.add('active');
    

    for (let i = 0; i < this.tabs.length; i++) {
        const item = this.tabs[i];
        item.classList.remove("show");
        if (item.dataset.content === currTab) {
          item.classList.add("show");
        }   
    }
}

