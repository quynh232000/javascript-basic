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
          <i class="fas fa-star"></i>
        </div>
        <span class="home-product-item__sold">${item.buy} đã bán</span>
      </div>
      <div class="home-product-item__origin">
        <span class="home-product-item__brand">${item.origan}</span>
        <span class="home-product-item__origin-name">${item.brand}</span>
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
listProductEl.innerHTML = htmlProduct.join("");
// slider

const arrSlider = [
  "banner1.jpg",
  "banner11.jpg",
  "banner12.png",
  "banner13.png",
  "banner14.jpg",
];
const renderSlider = () => {
  const bannerEl = document.querySelector(".g-list-img");
  const nextEl = document.querySelector(".icon-right");
  const prevEl = document.querySelector(".icon-left");
  const htmlSlider = arrSlider.map((item, index) => {
    return `
             <img
             src="../../assets/img/${item}"
             alt=""
             class="g-banner-top-img"
           />
    `;
  });
  bannerEl.innerHTML = htmlSlider.join("");
  const items = document.querySelectorAll(".g-banner-top-img");
  const dots = document.querySelectorAll(
    ".g-banner-top-left .g-banner-top-img-wrapper .g-dots li"
  );
  let lengthItems = items.length - 1;
  let active = 0;
  nextEl.onclick = function () {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
  };
  prevEl.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
  };
  let refreshInterval = setInterval(() => {
    nextEl.click();
  }, 6000);
  function reloadSlider() {
    bannerEl.style.left = -items[active].offsetLeft + "px";
    //
    let last_active_dot = document.querySelector(".g-dots .g-active-dot");
    last_active_dot.classList.remove("g-active-dot");
    dots[active].classList.add("g-active-dot");

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      nextEl.click();
    }, 6000);
  }
  dots.forEach((li, key) => {
    li.addEventListener("click", () => {
      active = key;
      reloadSlider();
    });
  });
};
renderSlider();
// // slider
