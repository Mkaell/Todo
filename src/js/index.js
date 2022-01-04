import '../scss/style.scss';

import { HeaderComponent } from "../components/header.components.js";
import { NavigationComponent } from "../components/navigation.components";
import { PostsComponent } from "../components/posts.components";
import { CreateComponent } from "../components/create.components";
import { FavoritesComponent } from "../components/favorite.components";




new HeaderComponent('#header');
const navigationComponent = new NavigationComponent('#navigation');
const postsComponent = new PostsComponent('#posts');
const createComponent = new CreateComponent('#create');
const favoritesComponent = new FavoritesComponent('#favorites');



navigationComponent.registerTabs([
    {name: 'create', component: createComponent},
    {name: 'posts', component: postsComponent},
    {name: 'favorites', component: favoritesComponent},
]);


