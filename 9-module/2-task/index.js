import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    // ... ваш код
    let response = await fetch('products.json');
    this.products = await response.json();

    this.carousel = new Carousel(slides);
    const carouselHolder = document.querySelector('[data-carousel-holder]');
    carouselHolder.append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    const ribbonMenuHolder = document.querySelector('[data-ribbon-holder]');
    ribbonMenuHolder.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({steps: 5});
    const stepSliderHolder = document.querySelector('[data-slider-holder]');
    stepSliderHolder.append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    const cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    const productsGridHolder = document.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = "";
    this.productGrid = new ProductsGrid(this.products);
    productsGridHolder.append(this.productGrid.elem);

    this.productGrid.updateFilter({
      noNuts: document.querySelector("#nuts-checkbox").checked,
      vegeterianOnly: document.querySelector("#vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener("product-add", event => {
      let product = this.products.find(obj => obj.id === event.detail);
      this.cart.addProduct(product);
    });

    stepSliderHolder.addEventListener("slider-change", event => {
      this.productGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    ribbonMenuHolder.addEventListener("ribbon-select", event => {
      this.productGrid.updateFilter({
        category: event.detail
      });
    });

    document.querySelector("#nuts-checkbox").addEventListener("change", event => {
      this.productGrid.updateFilter({
        noNuts: event.target.checked,
      });
    });

    document.querySelector("#vegeterian-checkbox").addEventListener("change", event => {
      this.productGrid.updateFilter({
        vegeterianOnly: event.target.checked,
      });
    });
  }
}
