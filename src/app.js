import SimpleLightbox from "simplelightbox";
import { CartState } from "./CartState";
import { createAppbar } from "./components/appbar";
import { createCard } from "./components/card";
import { createCart } from "./components/cart";
import { currencyFormat } from "./utils/currencyFormat";

const API_URL = "http://localhost:3000";

const rootEl = document.getElementById("app");
const appbar = document.createElement("div");
const cardsParent = document.createElement("div");

const fetchProducts = () => fetch(`${API_URL}/items`).then((res) => res.json());

const updateCart = () => {
  const sumProduct = currencyFormat(
    cartState.state.reduce(
      (acc, curr) =>
        (acc +=
          curr.localQty * (curr.isDiscount ? curr.promoPrice : curr.price)),
      0
    )
  );
  const cartContentEl = document.getElementById("cart-content");
  const createProductsHtml = () =>
    cartState.state
      .map((product) => {
        const price = currencyFormat(
          product.isDiscount ? product.promoPrice : product.price
        );

        return `
            <div class="flex items-center">
              <p>${product.name} - ${price}</p>
              <div class="ml-auto">
                <input data-id=${product.id} class="w-20" value=${product.localQty} min="1" type="number">
              </div>
            </div>
          `;
      })
      .join("");

  cartContentEl.innerHTML = `
    ${createProductsHtml()}
    <div class="flex"><p>SUMA:</p><p class="ml-auto">${sumProduct}</p></div>
  `;
};

const cartState = new CartState(updateCart);

const buildProducts = () => {
  return fetchProducts().then((data) => {
    return data.map((item) => {
      const card = document.createElement("div");

      card.classList.add("w-[30%]");
      card.innerHTML = createCard({
        name: item.name,
        price: currencyFormat(item.price),
        images: item.images
      });

      card.addEventListener("click", (ev) => {
        ev.preventDefault();

        if (ev.target.nodeName !== "BUTTON") {
          return;
        }

        cartState.addProduct({ ...item, localQty: 1 });
      });

      return card;
    });
  });
};

const onProductQtyInput = (ev) => {
  ev.stopPropagation();

  const productId = +ev.target.dataset.id;

  cartState.setQtyProduct(productId, +ev.target.value);
};

const buildAppUi = () => {
  cardsParent.classList.add("flex", "flex-wrap", "gap-4");
  appbar.append(createAppbar({ cartEl: createCart(onProductQtyInput) }));

  rootEl.append(appbar, cardsParent);
};

buildAppUi();
buildProducts().then((data) => {
  cardsParent.append(...data);

  new SimpleLightbox(".gallery a", {});
});
