import { Component } from "../core/component";
class NavigationComponent extends Component{
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
    
    //Adding an activity class to the current tab
    TABS.forEach(elem => {
        elem.classList.remove('active');
    });
    target.classList.add('active');

    const activeTab = this.tabs.find((tab) =>{
        return tab.name === currTab;
    });

    // Hiding all components
    this.tabs.forEach((tab)=>{
        return tab.component.hide();
    });

    // Showing the current component.
    activeTab.component.show();
}

export {NavigationComponent};

