import { store } from "./reduce.js";

const ListEl = document.querySelector(".b-body-item-wrapper");
const countTypeEl = document.querySelector(".count-type-product");
const totalPriceEl = document.querySelector(".total-price");
const btnBuyEl = document.querySelector(".price-btn");

const listProduct = store.state.listProduct;
