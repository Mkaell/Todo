import { Component } from "../core/component";
import { apiService } from "../services/app.service";
import { TransformService } from "../services/transform.service";
import { renderPost } from "../templates/post.template";

export class FavoritesComponent extends Component{
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

        // Создает обьект из массива id поста(key) и его title(value)
        favorites.forEach((favorite) => {
            posts.forEach((item) => {
                if(item.id === favorite){
                    titles[favorite] = item.title;
                }  
            });
        });
 
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
        const postId = event.target.dataset.idt;
        console.log(postId);
        this.$el.innerHTML = '';
        const post = await apiService.fetchPostById(postId);
        console.log(post);
        this.$el.insertAdjacentHTML('afterbegin', renderPost(post,{withButton: false}));
    } 
}

function renderList(list = {},){
    if(list !== undefined){
        return `
        <ul>
            <li>
                ${Object.entries(list).map((item) => 
                    `<a href="#" class='favorites__link js-link' data-idt="${item[0]}">${item[1]}</a>`).join(' ')
                }
            </li>
        </ul>
        `;

    } else {
        return `<p class="favorites__empty">There's nothing here yet</p>`;
    }
}

