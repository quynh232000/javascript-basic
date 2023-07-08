import { dataCategory, dataProducts } from "./data.js";
import { store } from "./reduce.js";
import * as actions from "./action.js";

const headerLogin = document.querySelector(".header-login-signup");
// =======login/////
console.log("home", store.state.isLogin);
if (store.state.isLogin === true) {
  headerLogin.innerHTML = `
  <div >
    <img src="../img/a1.jpg" alt="" class="h-avatar" />
    <span class="h-name"
      >quynhnv
      
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

  btnLogoutEl.onclick = () => {
    store.dispatch(actions.actionLogin(false));
  };
} else {
  headerLogin.innerHTML = `<a href="./src/page/register.html">Đăng nhập</a>`;
}
// store.subscribe(() => {
//   headerLogin.innerHTML = `<a href="./src/page/register.html">Đăng nhập</a>`;
// });
// =================================================================
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
  categoryEl.innerHTML = htmlCategory.join("");
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
  productEl.innerHTML = htmlProduct.join("");
};
const app = () => {
  renderCa();
  renderPro();
};
app();
