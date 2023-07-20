import { dataCategory, dataProducts } from "./data.js";
import { store } from "./reduce.js";
import * as actions from "./action.js";

const path = window.location.pathname;

const headerLogin = document.querySelector(".header-login-signup");
// =======login/////
if (store.state.isLogin) {
  if (headerLogin)
    headerLogin.innerHTML = `
  <div >
    <img src=${store?.state?.userInfo?.img} alt="" class="h-avatar" />
    <span class="h-name"
      >${store?.state?.userInfo?.name}
      
      <div class="header-logout">
        <div  class="show-profile">Tài khoản của tôi</div>
        <div class="logout">Đăng xuất</div>
      </div>
    </span>
  </div>
  `;
  // logout
  const btnLogoutEl = document.querySelector(".logout");
  const profileEl = document.querySelector(".show-profile");

  profileEl.onclick = () => {
    // src/page/profile.html
    window.location.href = "/ASM/src/page/profile.html";
  };
  btnLogoutEl.onclick = () => {
    store.dispatch(actions.actionLogin(false));
    store.dispatch(actions.actionIsLoginForm(true));
  };
} else {
  let urlName = "";
  if (path.includes("/src/")) {
    urlName = "";
  } else {
    urlName = "/src/page";
  }
  if (headerLogin)
    headerLogin.innerHTML = `<a href=".${urlName}/register.html">Đăng nhập</a>`;
}
store.subscribe(() => {
  let urlName = "";
  if (path.includes("/src/")) {
    urlName = "";
  } else {
    urlName = "/src/page";
  }
  if (headerLogin)
    headerLogin.innerHTML = `<a href=".${urlName}/register.html">Đăng nhập</a>`;
});
// =================================================================

// slider
const arrSlider = [
  "banner1.jpg",
  "banner11.jpg",
  "banner12.png",
  "banner13.png",
  "banner14.jpg",
];
const renderSlider = () => {
  const bannerEl = document.querySelector(".list-img");
  const nextEl = document.querySelector(".icon-right");
  const prevEl = document.querySelector(".icon-left");
  const htmlSlider = arrSlider.map((item, index) => {
    return `
             <img
             src="./assets/img/${item}"
             alt=""
             class="banner-top-img"
           />
    `;
  });
  if (bannerEl) bannerEl.innerHTML = htmlSlider.join("");
  const items = document.querySelectorAll(".banner-top-img");
  const dots = document.querySelectorAll(
    ".banner-top-left .banner-top-img-wrapper .dots li"
  );
  let lengthItems = items.length - 1;
  let active = 0;
  if (nextEl) {
    nextEl.onclick = function () {
      active = active + 1 <= lengthItems ? active + 1 : 0;
      reloadSlider();
    };
  }

  if (prevEl)
    prevEl.onclick = function () {
      active = active - 1 >= 0 ? active - 1 : lengthItems;
      reloadSlider();
    };
  let refreshInterval = setInterval(() => {
    if (nextEl) nextEl?.click();
  }, 6000);
  function reloadSlider() {
    if (bannerEl) bannerEl.style.left = -items[active].offsetLeft + "px";
    //
    let last_active_dot = document.querySelector(".dots .active-dot");
    if (last_active_dot) last_active_dot.classList.remove("active-dot");
    if (dots) dots[active].classList.add("active-dot");

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      nextEl && nextEl.click();
    }, 6000);
  }
  dots.forEach((li, key) => {
    li.addEventListener("click", () => {
      active = key;
      reloadSlider();
    });
  });
};

// ==============
const categoryEl = document.getElementById("category");
const productEl = document.getElementById("product");
// render category
const renderCa = () => {
  const htmlCategory = dataCategory.map((item) => {
    return `
        <a href="./src/page/group.html?group=${item.key}" class="caterogy_item">
                <img src=${item.img} alt=${item.title} class="caterogy-img" />
                <p class="caterogy-name">${item.title}</p>
              </a>
        `;
  });
  if (categoryEl) {
    categoryEl.innerHTML = htmlCategory.join("");
  }
};
// render product
const renderPro = () => {
  const htmlProduct = dataProducts.map((item) => {
    return `
        <div class="product-item">
            <a class="home-product-item" href="./src/page/detail.html?id=${
              item.id
            }">
            <div
                class="home-product-item__img"
                style="
                background-image: url('${item.img[0]}');
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
                <span class="home-product-item__brand">${item.origin}</span>
                <span class="home-product-item__origin-name">${
                  item.brand
                }</span>
            </div>
            <div class="home-product-item__favourite">
                <i class="fas fa-check"></i>
                <span>Yêu thích</span>
            </div>
            <div class="home-product-item__sale-off">
                <span class="home-product-item__sale-off-percent">${
                  item.sale
                }%</span>
                <span class="home-product-item__sale-off-label">GIẢM</span>
            </div>
            </a>
        </div>
    `;
  });
  if (productEl) {
    productEl.innerHTML = htmlProduct.join("");
  }
};
const renderCountCart = () => {
  const countEl = document.querySelector(".s-right-count");
  if (countEl) countEl.innerHTML = store.state.totalCount;
};

// show cart list
const showCart = document.querySelector(".s_has-cart");
// store.subscribe(() => {});
if (store?.state?.cart.length <= 0) {
  if (showCart) {
    showCart.innerHTML = `<img src="./assets/img/nocart.png" alt="" />
    <p>Chưa có sản phẩm nào.</p>`;
  }
} else {
  if (showCart) {
    let htmlCartList = store?.state?.cart.map((item) => {
      return `
      <div class="s_has-cart-item">
        <div class="s_has-cart-item-img">
          <img src=${item?.img[0]} alt="" />
        </div>
        <span>${item.name}</span>
      </div>
      `;
    });
    showCart.innerHTML = htmlCartList.join("");
  }
}
const app = () => {
  renderSlider();
  renderCa();
  renderPro();
  renderCountCart();
};
app();
