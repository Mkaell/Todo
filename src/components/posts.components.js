import { Component } from "../core/component";
import { renderPost } from "../templates/post.template";
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
        const html = posts.map((post) => renderPost(post, {withButton: true}));

        this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
    }

    onHide(){
        this.$el.innerHTML = '';
    }
}

function buttonHandler(event){
    const $el = event.target.closest('button');
    const id = $el.dataset.id;

    if(id){
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        

        if(favorites.includes(id)){
            //Удалить элемент
            $el.innerHTML = `<i class="fas fa-heart"></i>`;
            favorites = favorites.filter((fID) => fID != id);
        } else {
            $el.innerHTML = `<i class="fas fa-heart-broken"></i>`;
            favorites.push(id);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}