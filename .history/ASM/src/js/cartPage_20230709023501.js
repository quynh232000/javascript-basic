import { store } from "./reduce.js";
import { dataProducts } from "./data.js";

const listEl = document.querySelector(".b-body-item-wrapper");
const countTypeEl = document.querySelector(".count-type-product");
const totalPriceEl = document.querySelector(".total-price");
const btnBuyEl = document.querySelector(".price-btn");
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
const listProduct = store.state.cart;

if (listProduct) {
  const html = listProduct.map((item, index) => {
    const productInfo = dataProducts.find((product) => item.id == product.id);

    return `
                    <div class="b-group-body" data-index=${index}>
                        <div class="b-g-item">
                            <input class="item-input" type="checkbox" />
                            <img
                            src="${productInfo.img[0]}"
                            alt=""
                            class="item-img"
                            />
                            <p>
                            <a href="./detail.html" class="item-link"
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
                            <span>${VND.format(
                              productInfo.price * (1 - productInfo.sale / 100)
                            )}</span>
                        </div>

                        <div class="b-g-item">
                            <div class="item-count">-</div>
                            <div class="item-count count-numbeer">${
                              item.count
                            }</div>
                            <div class="item-count">+</div>
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
}
