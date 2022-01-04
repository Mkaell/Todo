import { Component } from "../core/component";
import { apiService } from "../services/app.service";
import { TransformService } from "../services/transform.service";
import { renderPost } from "../templates/post.template";

class FavoritesComponent extends Component{
    constructor(id) {
        super(id);    
    }
    init(){
        this.$el.addEventListener('click', linkClickHandler.bind(this));
    }

    async onShow(){
        const fireBaseData = await apiService.fetchPost();        
        const favorites = JSON.parse(localStorage.getItem('favorites'));       
        const posts = TransformService.convertObjectToArray(fireBaseData);
        const titles = {};

        createObjectFromArrays(favorites, posts, titles);

        const html = renderList(titles);
        this.$el.insertAdjacentHTML('afterbegin', html);
    }

    onHide(){
        this.$el.innerHTML = '';    
    }
}

async function linkClickHandler(event){
    event.preventDefault();

    if(event.target.classList.contains('js-link')){
        const postId = event.target.dataset.title;
        this.$el.innerHTML = '';
        const post = await apiService.fetchPostById(postId);
        this.$el.insertAdjacentHTML('afterbegin', renderPost(post,{withButton: false}));
    } 
}

function renderList(list = {}){
    console.log(list);
    if(!isEmpty(list)){
        return `
        <ul>
            <li class='favorites'>
                ${Object.entries(list).map((item) => 
                    `<a href="#" class='favorites__link js-link' data-title="${item[0]}">${item[1]}</a>`).join(' ')
                }
            </li>
        </ul>
        `;

    } else {
        return `
        <li class='favorites'>
            <p class="favorites__empty">There's nothing here yet</p>
        </li>`;
    }
}

// Creates an object from an array of post id(key) and its title(value)
function createObjectFromArrays(firstArray, SecondArray, sourceArray){
    firstArray.forEach((favorite) => {
        SecondArray.forEach((item) => {
            if(item.id === favorite){
                sourceArray[favorite] = item.title;
            }  
        });
    });
}

// The function checks whether the object is empty
function isEmpty(obj) {
    for(var key in obj){
        return false;
    }
    return true;
}

export {FavoritesComponent};

