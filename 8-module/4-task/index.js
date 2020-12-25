import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = new Modal();
    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let productIsFinded = this.cartItems.find((obj) => obj.product.id === product.id);
    if (productIsFinded){
      productIsFinded.count += 1;
    } else {
      productIsFinded = {
        product: product,
        count: 1,
      };

      this.cartItems.push(productIsFinded);
    };

    this.onProductUpdate(productIsFinded);
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let productIsFinded = this.cartItems.find((obj) => obj.product.id === productId);
    if (productIsFinded){
      productIsFinded.count += amount;

      if (productIsFinded.count === 0) this.cartItems.splice(this.cartItems.indexOf(productIsFinded), 1);

    };

    this.onProductUpdate(productIsFinded);
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if (this.cartItems.length === 0){
      return true;
    } else {
      return false;
    }
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalCount = 0;
    if (this.cartItems.length !== 0){
      for (const cartItem of this.cartItems){
        totalCount += cartItem.count;
      };
    };
    return totalCount;
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalPrice = 0;
    if (this.cartItems.length !== 0){
      for (const cartItem of this.cartItems){
        totalPrice += cartItem.product.price*cartItem.count;
      };
    };
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    this.modal.setTitle("Your order");
    this.cartRender = document.createElement("DIV");
    for (let productItem of this.cartItems){
      this.cartRender.append(this.renderProduct(productItem.product, productItem.count));
    };
    this.cartRender.append(this.renderOrderForm());

    this.modal.setBody(this.cartRender);
    this.modal.open();

    this.cartRender.addEventListener("click", event => {
      if (event.target.closest(".cart-counter__button_minus")){
        let productId = event.target.closest(".cart-product").dataset.productId;
        this.updateProductCount(productId, -1);
      };
  
      if (event.target.closest(".cart-counter__button_plus")){
        let productId = event.target.closest(".cart-product").dataset.productId;
        this.updateProductCount(productId, 1);
      }
    });

    document.querySelector(".cart-form").addEventListener("submit", event => {
      this.onSubmit(event);
    });
  }

  onProductUpdate(cartItem) {
    // ...ваш код
    if (document.body.classList.contains("is-modal-open")){
      if (cartItem.count === 0){
        this.cartRender.innerHTML = "";
        for (let productItem of this.cartItems){
          this.cartRender.append(this.renderProduct(productItem.product, productItem.count));
        };
        this.cartRender.append(this.renderOrderForm());
      } else {
        let productId = cartItem.product.id;
        let productCount = this.cartRender.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        let productPrice = this.cartRender.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        let infoPrice = this.cartRender.querySelector(`.cart-buttons__info-price`);
  
        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${(cartItem.product.price*cartItem.count).toFixed(2)}`;
        
        infoPrice.innerHTML = `€${(this.getTotalPrice()).toFixed(2)}`;
      };

      if (this.isEmpty()){
        this.modal.close();
      };
    }
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    // ...ваш код
    event.preventDefault();
    const submitBtn = document.querySelector(".cart-buttons__button");
    submitBtn.classList.add("is-loading");
    let orderForm = new FormData(document.querySelector(".cart-form"));

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: orderForm
    })
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response;
    })
    .then(() => {
      submitBtn.classList.remove("is-loading");
      this.modal.setTitle("Success!");
      this.cartItems = [];
      let communicator = document.createElement("DIV");
      communicator.classList.add("modal__body-inner");
      communicator.insertAdjacentHTML("beforeend", `
        <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
        </p>
      `)
      this.modal.setBody(communicator);
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

