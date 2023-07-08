import { dataProducts } from "./data.js";

let q = window.location.search;
let params = new URLSearchParams(q);
const groupName = params.get("group");
let listProduct = [];
if (groupName) {
  listProduct = dataProducts.filter((item) => item.group == groupName);
}

const listProductEl = document.getElementById("g-list");

const htmlProduct = listProduct.map((item) => {
  return `
    <div class="product-item">
    <a class="home-product-item" href="./detail.html?id=${item.id}">
      <div
        class="home-product-item__img"
        style="
          background-image: url(${item.img[0]});
        "
      ></div>
      <h4 class="home-product-item__name">
        ${item.name}
      </h4>
      <div class="home-product-item__price">
      <span class="home-product-item__price-old">${item.price}</span>
      <span class="home-product-item__price-current">${Math.floor(
        item.price * (1 - item.sale / 100)
      )}</span>
      </div>
      <div class="home-product-item__action">
        <span class="home-product-item__heart">
          <!-- home-product-item__heart--liked -->
          <i
            class="home-product-item__heart-icon-empty far fa-heart"
          ></i>
          <i
            class="home-product-item__heart-icon-fill fas fa-heart"
          ></i>
        </span>
        <div class="home-product-item__rating">
          <i class="home-product-item__star-gold fas fa-star"></i>
          <i class="home-product-item__star-gold fas fa-star"></i>
          <i class="home-product-item__star-gold fas fa-star"></i>
          <i class="home-product-item__star-gold fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <span class="home-product-item__sold">45 đã bán</span>
      </div>
      <div class="home-product-item__origin">
        <span class="home-product-item__brand">whoo</span>
        <span class="home-product-item__origin-name">Jappan</span>
      </div>
      <div class="home-product-item__favourite">
        <i class="fas fa-check"></i>
        <span>Yêu thích</span>
      </div>
      <div class="home-product-item__sale-off">
        <span class="home-product-item__sale-off-percent"
          >43%</span
        >
        <span class="home-product-item__sale-off-label"
          >GIẢM</span
        >
      </div>
    </a>
  </div>
    `;
});
