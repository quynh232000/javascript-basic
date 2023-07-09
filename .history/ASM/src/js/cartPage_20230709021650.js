import { store } from "./reduce.js";

const ListEl = document.querySelector(".b-body-item-wrapper");
const countTypeEl = document.querySelector(".count-type-product");
const totalPriceEl = document.querySelector(".total-price");
const btnBuyEl = document.querySelector(".price-btn");

const listProduct = store.state.cart;

if (listProduct) {
  const html = listProduct.map((item, index) => {
    console.log(item);
    return `
                    <div class="b-group-body">
                        <div class="b-g-item">
                            <input class="item-input" type="checkbox" />
                            <img
                            src="https://cdn.pnj.io/images/detailed/102/gnxmxmy001720-nhan-vang-18k-dinh-da-cz-pnj-001.png"
                            alt=""
                            class="item-img"
                            />
                            <p>
                            <a href="./detail.html" class="item-link"
                                >Nhẫn xoay phối xích bằng thép ti tan không gỉ màu</a
                            >
                            </p>
                            <div class="item-end">
                            <div class="item-end-text">Phân loại hàng</div>
                            <i class="fa-solid fa-sort-down"></i>
                            <div class="item-end-text">Bạc,5</div>
                            </div>
                        </div>
                        <div class="b-g-item">
                            <del>9.105</del>
                            <span>6.738</span>
                        </div>

                        <div class="b-g-item">
                            <div class="item-count">-</div>
                            <div class="item-count count-numbeer">1</div>
                            <div class="item-count">+</div>
                        </div>
                        <div class="b-g-item">
                            <div class="item-total">6.738</div>
                        </div>
                        <div class="b-g-item item-last">
                            <p class="item-delete">Xóa</p>
                        </div>
                    </div>
        `;
  });
}
