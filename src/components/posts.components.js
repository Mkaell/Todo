import { Component } from "../core/component";
import { renderPost } from "../templates/post.template";
import { apiService } from "../services/app.service";
import { TransformService } from "../services/transform.service";

class PostsComponent extends Component{
    constructor(id) {
        super(id);    
    }
    
    async onShow(){
        const fireBaseData = await apiService.fetchPost();
        const posts = TransformService.convertObjectToArray(fireBaseData);
        const html = posts.map((post) => renderPost(post, {withButton: true}));
        this.$el.insertAdjacentHTML('afterbegin', html.join(' '));     
    }

    init(){
        this.$el.addEventListener('click', buttonHandler.bind(this));
    }

    onHide(){
        this.$el.innerHTML = '';
    }
}

 function buttonHandler(event){
    const $el = event.target.closest('button');
    const id = $el.dataset.id;

    // function for deleting a post from firebase
    async function deletedPost() {
        if(event.target.classList.contains('posts__delete')){
            console.log(event.target);
            const postId = event.target.dataset.delete;
            await apiService.deletePostById(postId);
            document.location.reload();
        }
    }

    deletedPost();

    if(id){
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        if(favorites.includes(id)){
            //Delete a post from favorites
            $el.innerHTML = `<i class="fas fa-heart"></i>`;
            favorites = favorites.filter((fID) => fID != id);
        } else {
            //Add a post from favorites
            $el.innerHTML = `<i class="fas fa-heart-broken"></i>`;
            favorites.push(id);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

}

export {PostsComponent};



