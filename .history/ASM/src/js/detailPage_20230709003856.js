import { dataProducts } from "./data.js";
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

window.onload = () => {
  const nameBrandEl = document.querySelector(".detail-brand");
  const nameLinkEl = document.querySelector(".d-nav-name");
  const imgEl = document.querySelector(".d-top-left-img");
  const imgChildEl = document.querySelector(".d-left-img-list");
  const nameTitledEl = document.querySelector(".d-top-right-title");
  const buyEl = document.querySelector(".detail-buy");
  const priceGocEl = document.querySelector(".price-goc");
  const priceGiamEl = document.querySelector(".price-giam");

  let q = window.location.search;
  let params = new URLSearchParams(q);
  const idProduct = params?.get("id");
  const product = dataProducts.find((item) => item.id == idProduct);
  if (product) {
    nameBrandEl.textContent = `${product.origin}`;
    nameLinkEl.textContent = `${product.name}`;
    imgEl.src = `${product.img[0]}`;
    imgChildEl.innerHTML = product.img
      .map((item) => {
        return `
          <img src=${item} alt="" class="d-top-left-child">
          `;
      })
      .join("");
    nameTitledEl.textContent = `${product.name}`;
    buyEl.textContent = `${product.buy}`;
    priceGocEl.textContent = `${VND.format(product.price)}`;
    priceGiamEl.textContent = `${VND.format(
      product.price * (1 - product.sale / 100)
    )}`;
  }
  // list img
  imgChildEl.childNodes.forEach((item) => {
    item.onclick = (e) => {
      imgEl.src = e.target.src;
    };
  });
  // ===============================================================
  // price
  const removeProductEl = document.querySelector(".remove-count-product");
  const showProductEl = document.querySelector(".show-count-product");
  const addProductEl = document.querySelector(".add-count-product");
};
