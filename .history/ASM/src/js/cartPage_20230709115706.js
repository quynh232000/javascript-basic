import { store } from "./reduce.js";
import { dataProducts } from "./data.js";
import * as actions from "./action.js";

const listEl = document.querySelector(".b-body-item-wrapper");
const countTypeEl = document.querySelector(".count-type-product");
const totalPriceEl = document.querySelector(".total-price");
const btnBuyEl = document.querySelector(".price-btn");
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
const formatPrice = (price) => {
  price = price.slice(0, price.length - 1);
  return +price.split(".").join("");
};
const listProduct = store.state.cart;
const renderListProduct = (listProduct) => {
  const html = listProduct.map((item, index) => {
    const productInfo = dataProducts.find((product) => item.id == product.id);

    return `
                    <div class="b-group-body b-group-body-product" data-index=${index}>
                        <div class="b-g-item">
                            <input class="item-input" type="checkbox" checked/>
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
                            <div class="item-end-text">Loại</div>
                            <i class="fa-solid fa-sort-down"></i>
                            <div class="item-end-text">${
                              productInfo.origin
                            }</div>
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

      deleteEl.onclick = () => {
        console.log("hello");
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

      // total
      totalPay += +formatPrice(totalOneTypeEl.textContent);
    });

    // show Total Pay
    totalPriceEl.textContent = VND.format(totalPay);
  }
};

if (listProduct) {
  renderListProduct(listProduct);
  //   handle event
}
