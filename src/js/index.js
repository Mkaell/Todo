import '../scss/style.scss';
import { HeaderComponent } from "../components/header.components.js";

new HeaderComponent('#header');

const tabsHeader = document.querySelectorAll('.navigation__link');
const tabsContent = document.querySelectorAll('.working-field__item');
// const mainBtn = document.querySelector('.main__btn');
// const firstScreen = document.querySelector('.main');
// const secondScreen = document.querySelector('.working-field');

function changeClass(el) {
  for (let i = 0; i < tabsHeader.length; i++) {
    tabsHeader[i].classList.remove("active");
  }
  el.classList.add("active");
}
tabsHeader.forEach((item)=>{
    item.addEventListener("click", (event) => {
        let currTab = event.target.dataset.tab;
        changeClass(event.target);
      
        tabsContent.forEach((item) => {
          item.classList.remove("d-block");
          if (item.dataset.content === currTab) {
            item.classList.add("d-block");
          }
        });
    });
});


// function changeScreen() {
//   mainBtn.addEventListener('click',()=>{
//     firstScreen.classList.remove('show');
//     firstScreen.classList.add('hide');
//     secondScreen.classList.remove('hide');
//     secondScreen.classLict.add('show');
//   });
// }


// changeScreen();
