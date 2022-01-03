function renderPost(post, options = {}){
    const tag = 
        post.type === 'news' ?
          `News`:
          `Note`;

    const HEART = '<i class="fas fa-heart"></i>';
    const BROUKEN_HEART = '<i class="fas fa-heart-broken"></i>';     
    const button = (JSON.parse(localStorage.getItem('favorites')) || []).includes(post.id) ?
          `<button class='posts__btn btn'data-id='${post.id}' >${BROUKEN_HEART}</button>`:
          `<button class='posts__btn btn' data-id='${post.id}'>${HEART}</button>`;
    
    const buttonDelete = 
    `<button class='posts__delete' data-delete='${post.id}'>&#10006;</button>`;
    
    return `
    <div class="posts__wrapper">
        <div class="posts__item">
            <h2 class="posts__title">${post.title}</h2>
            <div class="posts__label">${tag}</div>
            ${options.withButton ? buttonDelete: ' '}
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
            ${options.withButton ? button: ' '}
        </div>
    </div>
    `;
}


export {renderPost};
