import { Component } from "../core/component";
import { apiService } from "../services/app.service";
import { TransformService } from "../services/transform.service";

export class PostsComponent extends Component{
    constructor(id) {
        super(id);    
    }

    init(){
        this.$el.addEventListener('click', buttonHandler.bind(this));
    }

    async onShow(){
        const fireBaseData = await apiService.fetchPost();
        const posts = TransformService.convertObjectToArray(fireBaseData);
        console.log(posts);
        const html = posts.map((post) => renderPost(post));

        this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
    }

    onHide(){
        this.$el.innerHTML = '';
    }
}

function renderPost(post){
    const tag = 
        post.type === 'news' ?
          `News`:
          `Note`;

    const button = (JSON.parse(localStorage.getItem('favorites')) || []).includes(post.id) ?
          `<button class='posts__btn btn'data-id='${post.id}' >&#x1F5D1;</button>`:
          `<button class='posts__btn btn' data-id='${post.id}'>&#10084;</button>`;
    
    return `
    <div class="posts__wrapper">
        <div class="posts__item">
            <h2 class="posts__title">${post.title}</h2>
            <div class="posts__label">${tag}</div>
        </div>
        <div class="posts__item">
            <p class="posts__text">
                ${post.fulltext}
            </p>
        </div>
        <div class="posts__item">
            <p class="posts__data">
                ${post.date}
            </p>
            ${button}
        </div>
    </div>
    `;
}

function buttonHandler(event){
    const $el = event.target;
    const id = $el.dataset.id;

    if(id){
        console.log(id);
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        console.log(favorites);

        if(favorites.includes(id)){
            //Удалить элемент
            $el.innerHTML = `&#10084;`;
            favorites = favorites.filter((fID) => fID != id);
        } else {
            $el.innerHTML = `&#x1F5D1;`;
            favorites.push(id);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}