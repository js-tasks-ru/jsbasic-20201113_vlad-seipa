import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
  }

  render(){
    // Корневой элемент RibbonMenu
    const ribbon = document.createElement("DIV")
    ribbon.classList.add("ribbon");

    // Кнопка прокрутки влево
    let template = `
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;
    ribbon.insertAdjacentHTML("beforeend", template);

    // Ссылки на категории
    const ribbonInner = document.createElement("NAV");
    ribbonInner.classList.add("ribbon__inner");
    for(const category of this.categories){
      template = `
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `;
      ribbonInner.insertAdjacentHTML("beforeend", template);
    };
    ribbonInner.children[0].classList.add("ribbon__item_active");
    ribbon.append(ribbonInner);

    // Кнопка прокрутки вправо
    template = `
    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    `;
    ribbon.insertAdjacentHTML("beforeend", template);
  
    // Прокрутка меню
    const arrowLeft = ribbon.querySelector(".ribbon__arrow_left");
    const arrowRight = ribbon.querySelector(".ribbon__arrow_right");

    if (ribbonInner.scrollLeft === 0){
      arrowLeft.classList.remove("ribbon__arrow_visible");
      arrowRight.classList.add("ribbon__arrow_visible");
    }

    ribbon.addEventListener("click", (event) => {
      if (event.target.closest(".ribbon__arrow_left")){
        ribbonInner.scrollBy(-350, 0);
        ribbonInner.onscroll = function() {
          if (ribbonInner.scrollLeft === 0) arrowLeft.classList.remove("ribbon__arrow_visible");
          if ((ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth) > 0) arrowRight.classList.add("ribbon__arrow_visible");
        };
      } else if (event.target.closest(".ribbon__arrow_right")){
        ribbonInner.scrollBy(350, 0);
        ribbonInner.onscroll = function() {
          if (ribbonInner.scrollLeft !== 0) arrowLeft.classList.add("ribbon__arrow_visible");
          if ((ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth) < 1) arrowRight.classList.remove("ribbon__arrow_visible");
        };
      } if (event.target.closest(".ribbon__item")){

        // Выбор конкретной категории
        event.preventDefault();
        let categoryItem = event.target.closest(".ribbon__item");
        for (let obj of ribbon.querySelectorAll(".ribbon__item")){
          obj.classList.remove("ribbon__item_active");
        };
        categoryItem.classList.add("ribbon__item_active");

        let ev = new CustomEvent('ribbon-select', {
          detail: categoryItem.dataset.id,
          bubbles: true
        })
        ribbon.dispatchEvent(ev);

      } else {
        return
      };
    });

    return ribbon;
  }
}
