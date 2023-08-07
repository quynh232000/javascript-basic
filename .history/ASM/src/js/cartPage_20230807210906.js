import { store } from "./reduce.js";
import { dataProducts } from "./data.js";
import * as actions from "./action.js";

const listEl = document.querySelector(".b-body-item-wrapper");
const countTypeEl = document.querySelector(".count-type-product");
const totalPriceEl = document.querySelector(".total-price");
const btnBuyEl = document.querySelector(".price-btn");
const checkAllEl = document.querySelector(".input-check-all");
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
const formatPrice = (price) => {
  price = price.slice(0, price.length - 1);
  return +price.split(".").join("");
};
const listProduct = store.state.cart;
let checkAll = false;
let countCheck = 0;

const renderListProduct = (listProduct) => {
  const html = listProduct.map((item, index) => {
    const productInfo = dataProducts.find((product) => item.id == product.id);
    const arr = ["Size 8:12 -15kg", "Size 12:16 -18kg", "Size 16:22 -35kg"];
    let htmlSelec = arr
      .map((p) => {
        return `
      <option value="Size 8:12 -15kg" ${
        p == item.size && "selected"
      }>${p}</option>
      `;
      })
      .join("");

    return `
                    <div class="b-group-body b-group-body-product" data-index=${index}>
                        <div class="b-g-item">
                            <input class="item-input input-check-product" type="checkbox"/>
                            <img
                            src="${productInfo.img[0]}"
                            alt=""
                            class="item-img"
                            />
                            <p>
                            <a href="./detail.html?id=${
                              productInfo.id
                            }" class="item-link"
                                >${productInfo.name}</a
                            >
                            </p>
                            <div class="item-end">
                            <select class="item-end-text">
                           ${htmlSelec}
                          </select>
                            </div>
                        </div>
                        <div class="b-g-item">
                            <del>${VND.format(productInfo.price)}</del>
                            <span class="price-one-product">${VND.format(
                              productInfo.price * (1 - productInfo.sale / 100)
                            )}</span>
                        </div>

                        <div class="b-g-item">
                            <div class="item-count item-remove">-</div>
                            <div class="item-count count-numbeer">${
                              item.count
                            }</div>
                            <div class="item-count item-add">+</div>
                        </div>
                        <div class="b-g-item">
                            <div class="item-total">${VND.format(
                              productInfo.price *
                                (1 - productInfo.sale / 100) *
                                item.count
                            )}</div>
                        </div>
                        <div class="b-g-item item-last">
                            <p class="item-delete">Xóa</p>
                        </div>
                    </div>
        `;
  });
  if (listEl) listEl.innerHTML = html.join("");
  const groupEl = document.querySelectorAll(".b-group-body-product");
  if (groupEl) {
    let totalPay = 0;

    groupEl.forEach((element) => {
      // add and remove count of product
      const priceEl = element.querySelector(".price-one-product");
      const removeEl = element.querySelector(".item-remove");
      const addEl = element.querySelector(".item-add");
      const countEl = element.querySelector(".count-numbeer");
      const totalOneTypeEl = element.querySelector(".item-total");
      const deleteEl = element.querySelector(".item-delete");
      const checkProductEl = element.querySelector(".input-check-product");

      deleteEl.onclick = () => {
        listProduct.splice(+element.dataset.index, 1);
        store.dispatch(actions.actionUpdateCart(listProduct));
        store.subscribe(() => {
          renderListProduct(listProduct);
        });
      };
      addEl.onclick = () => {
        listProduct[+element.dataset.index].count++;
        countEl.textContent = listProduct[+element.dataset.index].count + "";
        totalOneTypeEl.textContent = VND.format(
          formatPrice(priceEl.textContent) *
            listProduct[+element.dataset.index].count
        );
        store.dispatch(actions.actionUpdateCart(listProduct));
        store.subscribe(() => {
          renderListProduct(listProduct);
        });
      };
      removeEl.onclick = () => {
        if (listProduct[+element.dataset.index].count > 1) {
          listProduct[+element.dataset.index].count--;
          countEl.textContent = listProduct[+element.dataset.index].count + "";
          totalOneTypeEl.textContent = VND.format(
            formatPrice(priceEl.textContent) *
              listProduct[+element.dataset.index].count
          );
          store.dispatch(actions.actionUpdateCart(listProduct));
          store.subscribe(() => {
            renderListProduct(listProduct);
          });
        }
      };
      // count check
      checkProductEl.onchange = (e) => {
        if (e.target.checked) {
          countCheck++;
          if (countCheck === listProduct.length) {
            checkAllEl.checked = true;
          } else {
            checkAllEl.checked = false;
          }
          countTypeEl.textContent = countCheck + "";
          totalPay += +formatPrice(totalOneTypeEl.textContent);
          totalPriceEl.textContent = VND.format(totalPay);
        } else {
          checkAllEl.checked = false;
          countCheck--;
          countTypeEl.textContent = countCheck + "";
          totalPay -= +formatPrice(totalOneTypeEl.textContent);
          totalPriceEl.textContent = VND.format(totalPay);
        }
      };
      if (checkAll === true) {
        checkProductEl.checked = true;
      } else {
        checkProductEl.checked = false;
        countCheck = 0;
      }
      if (checkProductEl.checked) {
        // total
        totalPay += +formatPrice(totalOneTypeEl.textContent);
      }
    });

    // show Total Pay
    totalPriceEl.textContent = VND.format(totalPay);
  }
};

if (listProduct) {
  renderListProduct(listProduct);
  checkAllEl.onchange = (e) => {
    if (e.target.checked) {
      countTypeEl.textContent = listProduct.length + "";
      checkAll = true;
    } else {
      countTypeEl.textContent = "0";
      checkAll = false;
    }
    renderListProduct(listProduct);
  };
  //   handle event
}
// buy
const toastEl = document.querySelector(".toast");
const btnCartBuyEl = document.getElementById("btn-buy-cart");
btnCartBuyEl.onclick = (e) => {
  if (countTypeEl.textContent == 0) {
    console.log("okoko");
    toastEl.classList.remove("hidden");
    toastEl.textContent = "Vui lòng chọn sản phẩm!";
    setTimeout(() => {
      toastEl.classList.add("hidden");
    }, 4000);
  } else {
    store.dispatch(actions.actionUpdateCart([]));
    toastEl.classList.remove("hidden");
    toastEl.textContent = "Mua hàng thành công!";
    setTimeout(() => {
      toastEl.classList.add("hidden");
      location.href = "../../";
    }, 2000);
  }
};
