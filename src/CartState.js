export class CartState {
  #state = [];

  constructor(onUpdate) {
    this.onUpdate = onUpdate;
  }

  addProduct(product) {
    this.#state.push(product);
    this.#saveState();
    this.onUpdate();
  }

  deleteProduct(id) {
    this.#state = this.#state.filter((product) => product.id !== id);
    this.#saveState();
    this.onUpdate();
  }

  setQtyProduct(id, value) {
    this.#state = this.#state.map((product) => {
      if (product.id === id) {
        return { ...product, localQty: value };
      }

      return product;
    });
    this.onUpdate();
  }

  loadInitialState() {
    this.#state = this.#loadState();
  }

  get state() {
    return this.#state;
  }

  #saveState() {
    localStorage.setItem("cart", JSON.stringify(this.#state));
  }

  #loadState() {
    const cart = localStorage.getItem("cart");

    if (cart) {
      return JSON.parse(cart);
    }

    return [];
  }
}
