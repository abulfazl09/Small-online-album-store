const $ = document;
const cartContainer = $.getElementById("cart-items");
const totalPriceElem = $.getElementById("total-price");

let cart = [];

// Local Storage
function setStorage(array) {
  localStorage.setItem("albumsCart", JSON.stringify(array));
}

function getStorage() {
  let cartData = JSON.parse(localStorage.getItem("albumsCart"));
  if (cartData) cart = cartData;
  dispalyCart(cart);
}

window.addEventListener("load", getStorage);

// Total Price Calculator
function totalPriceCalc(array) {
  let totalPrice = 0;

  array.forEach(function (product) {
    totalPrice += product.price * product.count;
  });

  totalPriceElem.innerHTML = `TOTAL: $${totalPrice}`;
}

// Show Cart item
function dispalyCart(array) {
  totalPriceCalc(array);

  if (array.length > 0) {
    let itemsFragment = $.createDocumentFragment();

    array.forEach(function (product) {
      let item = `<div class="cart-item rounded-3 mb-2 p-2 d-flex justify-content-between align-items-center">
                        <img src="${product.img}" alt="cart-item" class="rounded-3" style="width: 50px;">
                        <div class="fs-5">${product.name}</div>
                        <div class="fs-5">${product.price}</div>
                        <div class="d-flex">
                            <input oninput="changeCount(event, ${product.id})" type="number" value="${product.count}" min="1" class="form-control me-2" style="width: 50px;">
                            <button onclick="removeCartItem(${product.id})" class="btn btn-danger">REMOVE</button>
                        </div>
                    </div>`;

      itemsFragment.append(item);
    });

    cartContainer.innerHTML = itemsFragment.textContent;
  } else
    cartContainer.innerHTML =
      '<p class="text-center text-light">Your shopping cart is empty!</p>';
}

// Remove Cart
function removeCartItem(id) {
  cart = cart.filter(function (product) {
    return product.id != id;
  });

  dispalyCart(cart);
  setStorage(cart);
}

// Change Cart item Count
function changeCount(event, id) {
  cart.forEach(function (product) {
    if (product.id == id) product.count = +event.target.value;
  });

  dispalyCart(cart);
  setStorage(cart);
}

// Back Button
function backPage() {
  history.back()
}
