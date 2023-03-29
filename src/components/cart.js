import { Popover } from "flowbite";

export const createCart = (onProductQtyInput) => {
  const cartContentEl = document.createElement("div");

  cartContentEl.classList.add("px-3", "py-2");
  cartContentEl.id = "cart-content";
  cartContentEl.addEventListener("input", onProductQtyInput);
  cartContentEl.textContent = "Brak produktów w koszyku";

  const result = document.createElement("div");

  result.innerHTML = `
    <button id="cart">🛒</button>
    <div id="target-popover" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0">
      <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg">
          <h3 class="font-semibold text-gray-900">Cart</h3>
      </div>        
      <div data-popper-arrow></div>
    </div>
  `;

  const el = result.querySelector("[data-popper-arrow]");

  el.parentNode.insertBefore(cartContentEl, el);

  new Popover(
    result.querySelector("#target-popover"),
    result.querySelector("#cart")
  );

  return result;
};
