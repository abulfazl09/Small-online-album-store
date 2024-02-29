const $ = document;
const productsContainer = $.getElementById("shop-items");
const paginationContainer = $.getElementById("pagination");
const cartItemCounterElem = $.getElementById("counter");

let cart = [];

let currentPage = 1;
let numberShowItem = 4;

// Local Storage
function setStorage(array) {
  localStorage.setItem("albumsCart", JSON.stringify(array));
}

function setCurrentPage(current) {
  localStorage.setItem("currentPage", current);
}

function getStorage() {
  let cartData = JSON.parse(localStorage.getItem("albumsCart"));
  if (cartData) cart = cartData;
  cartItemCounter(cart);
  getCurrentPage()
}

function getCurrentPage() {
  let currentData = localStorage.getItem("currentPage");
  if (currentData) currentPage = +currentData;
  displayProducts(products, currentPage, numberShowItem);
  displayPagination(products, currentPage, numberShowItem);
}

window.addEventListener("load", getStorage);

// Show Items Products
function displayProducts(array, current, count) {
  let end = current * count;
  let start = end - count;

  let itemsFragment = $.createDocumentFragment();
  let item = "";
  let dispalyArray = array.slice(start, end);
  dispalyArray.forEach(function (product) {
    item = `<div class="shop-item rounded-3 p-3 m-4">
                    <div class="item-img w-100 rounded-3 mb-3">
                        <img src="${product.img}" class="w-100 rounded-3">
                    </div>
                    <div class="item-info">
                        <div class="h4 fw-bold">${product.name}</div>
                        <div class="details">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                        <div class="mt-2">
                            <button onclick="addToCart(${product.id})" class="btn btn-warning me-2"><i class="fa fa-basket-shopping"></i></button>
                            <a href="./single.product.htm?id=${product.id}" class="btn btn-danger">See</a>
                            <div class="text-dark fw-bold d-inline ms-5 my-auto">$${product.price}</div>
                        </div>
                    </div>
                </div>`;

    itemsFragment.append(item);
  });
  productsContainer.innerHTML = itemsFragment.textContent;
}

function displayPagination(array, current, count) {
  let numberBtn = Math.ceil(array.length / count);

  let item = "";
  let itemsFragment = $.createDocumentFragment();
  for (let index = 1; index <= numberBtn; index++) {
    item = `<button onclick="changePage(event)" class="btn btn-outline-light mx-1 fw-bold">${index}</button>`;
    if (index == current)
      item = `<button onclick="changePage(event)" class="btn btn-outline-light mx-1 fw-bold active">${index}</button>`;
    itemsFragment.append(item);
  }

  paginationContainer.innerHTML = itemsFragment.textContent;
}

function changePage(event) {
  currentPage = +event.target.innerHTML;
  displayProducts(products, currentPage, numberShowItem);
  displayPagination(products, currentPage, numberShowItem);
  setCurrentPage(currentPage);
}

displayProducts(products, currentPage, numberShowItem);
displayPagination(products, currentPage, numberShowItem);

// Add to Cart
function cartItemCounter(array) {
  cartItemCounterElem.innerHTML = array.length;
  cartItemCounterElem.classList.remove("d-none");
  if (array.length < 1) cartItemCounterElem.classList.add("d-none");
}

function addToCart(id) {
  let findProduct = products.find(function (product) {
    return product.id == id;
  });

  let hasProduct = cart.some(function (product) {
    return product.id == findProduct.id;
  });

  if (!hasProduct) cart.push(findProduct);
  else
    cart.forEach(function (product) {
      if (product.id == findProduct.id) product.count++;
    });

  cartItemCounter(cart);
  setStorage(cart);
}
