import { Component } from "../core/component";
// import { PostsComponent } from "../components/posts.components";
// import { CreateComponent } from "../components/create.components";
// import { FavoriteComponent } from "../components/favorite.components";

// const postsComponent = new PostsComponent('#posts');
// const createComponent = new CreateComponent('#create');
// const favoriteComponent = new FavoriteComponent('#favorite');



export class NavigationComponent extends Component{
    constructor(id) {
        super(id);
        this.tabs = [];    
    }
    registerTabs(tabs){
        this.tabs = tabs;
    }

    init(){
        this.$el.addEventListener('click', tabClickHandler.bind(this));
    }  
}

function tabClickHandler(event){
    event.preventDefault();
    const TABS = Array.from(this.$el.querySelectorAll('.navigation__link'));
    const target = event.target;
    let currTab = target.dataset.name;
    
    //Добавление класса активности к текущему табу.
    TABS.forEach(elem => { 
        elem.classList.remove('active');
    });
    target.classList.add('active');
    
    //Получаем id текущего компонента через data-name активного таба.
    const activeTab = this.tabs.find((tab) =>{
        return tab.name === currTab;
    });

    // Скрываем все компоненты
    this.tabs.forEach((tab)=>{
        return tab.component.hide();
    });

    // Показываем текущей компонент.
    activeTab.component.show();
}

