import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();
    this.initialTopCoord = false;
    this.containerRectRight = document.querySelector('.container').getBoundingClientRect().right;
    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  isHidden(elem) {
    return !elem.offsetWidth && !elem.offsetHeight;
  }

  updatePosition() {
    // ваш код ...
    if (this.isHidden(this.elem)) return;

    if (!this.initialTopCoord){
      this.initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset; 
    };

    this.leftIndent = Math.min(
      document.querySelector('.container').getBoundingClientRect().right + 20,
      document.documentElement.clientWidth - this.elem.offsetWidth - 10
    );

    let css = `
    position: fixed;
    top: 50px;
    z-index: 1000;
    right: 10px;
    left: ${this.leftIndent}px
    `;

    if (document.documentElement.clientWidth <= 767) {
      this.elem.style.cssText = ``;
    } else {
      if (window.pageYOffset > this.initialTopCoord) {
        this.elem.style.cssText = css;
      } else {
        this.elem.style.cssText = ``;
      };
    };
  }
}
