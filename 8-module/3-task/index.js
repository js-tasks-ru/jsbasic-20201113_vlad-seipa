export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
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
    // ваш код
    let productIsFinded = this.cartItems.find((obj) => obj.product.id === productId);
    if (productIsFinded){
      productIsFinded.count += amount;

      if (productIsFinded.count === 0) this.cartItems.splice(this.cartItems.indexOf(productIsFinded), 1);

    };

    this.onProductUpdate(productIsFinded);
  }

  isEmpty() {
    // ваш код
    if (this.cartItems.length === 0){
      return true;
    } else {
      return false;
    }
  }

  getTotalCount() {
    // ваш код
    let totalCount = 0;
    if (this.cartItems.length !== 0){
      for (const cartItem of this.cartItems){
        totalCount += cartItem.count;
      };
    };
    return totalCount;
  }

  getTotalPrice() {
    // ваш код
    let totalPrice = 0;
    if (this.cartItems.length !== 0){
      for (const cartItem of this.cartItems){
        totalPrice += cartItem.product.price*cartItem.count;
      };
    };
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

