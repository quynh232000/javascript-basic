import { dataProducts } from "./data.js";

let q = window.location.search;
let params = new URLSearchParams(q);
const idProduct = params?.get("id") || 0;
const product = dataProducts.find((item) => (item.id = idProduct));

const nameBrandEl = document.querySelector(".detail-brand");
const nameLinkEl = document.querySelector(".d-nav-name");
const imgEl = document.querySelector(".d-top-left-img");
const imgChildEl = document.querySelectorAll(".d-top-left-child");
const nameTitledEl = document.querySelector(".d-top-right-title");
const buyEl = document.querySelector(".detail-buy");
const priceGocEl = document.querySelector(".price-goc");
const priceGiamEl = document.querySelector(".price-giam");

if (product) {
  nameBrandEl.textContent = `${product.origin}`;
  nameLinkEl.textContent = `${product.name}`;
  imgEl.src = `${product.img[0]}`;
  //   imgChildEl.textContent =`${product.}`;
  nameTitledEl.textContent = `${product.name}`;
  buyEl.textContent = `${product.buy}`;
  priceGocEl.textContent = `${product.price}`;
  priceGiamEl.textContent = `${product.price * (1 - product.sale / 100)}`;
}