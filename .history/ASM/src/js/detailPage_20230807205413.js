import { store } from "./reduce.js";
import * as actions from "./action.js";

import { dataProducts } from "./data.js";
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

// window.onload = () => {
const nameBrandEl = document.querySelector(".detail-brand");
const nameLinkEl = document.querySelector(".d-nav-name");
const imgEl = document.querySelector(".d-top-left-img");
const imgChildEl = document.querySelector(".d-left-img-list");
const nameTitledEl = document.querySelector(".d-top-right-title");
const buyEl = document.querySelector(".detail-buy");
const priceGocEl = document.querySelector(".price-goc");
const priceGiamEl = document.querySelector(".price-giam");
const toastEl = document.querySelector(".toast");

let q = window.location.search;
let params = new URLSearchParams(q);
const idProduct = params?.get("id");
const product = dataProducts.find((item) => item.id == idProduct);
if (product) {
  nameBrandEl.textContent = `${product.origin}`;
  nameLinkEl.textContent = `${product.name}`;
  imgEl.src = `${product.img[0]}`;
  if (imgChildEl) {
    imgChildEl.innerHTML = product.img
      .map((item) => {
        return `
          <img src=${item} alt="" class="d-top-left-child">
          `;
      })
      .join("");
  }
  nameTitledEl.textContent = `${product.name}`;
  buyEl.textContent = `${product.buy}`;
  priceGocEl.textContent = `${VND.format(product.price)}`;
  priceGiamEl.textContent = `${VND.format(
    product.price * (1 - product.sale / 100)
  )}`;
}
// list img
imgChildEl.childNodes.forEach((item) => {
  item.onmouseover = (e) => {
    imgEl.src = e.target.src;
  };
});
// ===============================================================
const sizes = document.querySelectorAll(".size");
let selectSize = "";
sizes.forEach((item) => {
  item.addEventListener("click", () => {
    sizes.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");
    selectSize = item.textContent;
  });
});
// price
const removeProductEl = document.querySelector(".remove-count-product");
const showProductEl = document.querySelector(".show-count-product");
const addProductEl = document.querySelector(".add-count-product");
const addCartEl = document.querySelector(".d-top-btn-add");
const buyNowEl = document.querySelector(".btn-buy-now");
const countEl = document.querySelector(".s-right-count");
countEl.innerHTML = store.state.totalCount;
let count = 1;
showProductEl.textContent = count;
if (removeProductEl)
  removeProductEl.onclick = () => {
    if (count > 1) {
      count--;
      showProductEl.textContent = count + "";
    }
  };
if (addProductEl)
  addProductEl.onclick = () => {
    count++;
    showProductEl.textContent = count + "";
  };

addCartEl.onclick = () => {
  let check = true;

  if (!selectSize) {
    toastEl.classList.remove("hidden");
    toastEl.textContent = "Vui lòng chọn size!";
    check = false;
    setTimeout(() => {
      toastEl.classList.add("hidden");
    }, 4000);
  }
  if (count == 0) {
    check = false;
    toastEl.classList.remove("hidden");
    toastEl.textContent = "Vui lòng chọn số lượng!";
    setTimeout(() => {
      toastEl.classList.add("hidden");
    }, 4000);
  }
  if (check) {
    countEl.innerHTML = count + store.state.totalCount;
    store.dispatch(
      actions.actionAddCart({ id: idProduct, count, size: selectSize })
    );
    console.log(toastEl);
    toastEl.classList.remove("hidden");
    toastEl.textContent = "Đã thêm vào giỏ hàng";
    setTimeout(() => {
      toastEl.classList.add("hidden");
    }, 4000);
  }
};
// add to cart and buy now
