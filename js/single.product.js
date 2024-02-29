const $ = document;
const productInfoContainer = $.getElementById("product-info");
const cartItemCounterElem = $.getElementById("counter");

let cart = [];

// Local Storage
function setStorage(array) {
  localStorage.setItem("albumsCart", JSON.stringify(array));
}

// Back Buttto
function backPage() {
  history.back();
}

// get Product ID
let searchParams = new URLSearchParams(location.search);
let productID = searchParams.get("id");

// Dispaly Product Information
function dispalyProductInfo(array, id) {
  let findProduct = array.find(function (product) {
    return product.id == id;
  });

  productInfoContainer.innerHTML = `<div class="row">
                    <div class="col px-3">
                        <img src="${findProduct.img}" alt="product-image" class="rounded-3" style="width: 100%;">
                    </div>
                    <div class="col px-3 text-light">
                        <div class="h1 fw-bold">${findProduct.name}</div>
                        <div class="fs-5 mb-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum cumque
                            reiciendis sit odio? Laboriosam temporibus iste alias consectetur id. Corporis sapiente nesciunt
                            commodi, deleniti autem molestiae explicabo voluptatum minus officiis!</div>
                        <div class="fs-4 mb-2">$${findProduct.price}</div>
                        <button onclick="addToCart(${findProduct.id})" class="btn btn-warning fw-bold">ADD TO CART</button>
                    </div>
                </div`;
}

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

// Loaded
function getStorage() {
  let cartData = JSON.parse(localStorage.getItem("albumsCart"));
  if (cartData) cart = cartData;
  dispalyProductInfo(products, productID);
  cartItemCounter(cart);
}

window.addEventListener("load", getStorage);
