import { a } from "./Lab5_2.js";

const priceEl = document.querySelector(".price");
const addEl = document.querySelector(".cal-add");
const deleteEl = document.querySelector(".cal-delete");
const priceTotalEl = document.querySelector(".item-total");
const countEl = document.querySelector(".count");
const payEl = document.querySelector(".pay");
const showCountEl = document.querySelector(".count-numbeer");

const priceItem = 26890000;
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
let countItem = 1;
let totalItem = 0;
let payItem = 0;
priceEl.textContent = String(VND.format(priceItem));
showCountEl.textContent = String(countItem);
const render = () => {
  totalItem = priceItem * countItem;
  payItem = totalItem * 0.9;
  showCountEl.textContent = String(countItem);
  priceTotalEl.textContent = String(VND.format(totalItem));
  countEl.textContent = String(countItem);
  payEl.textContent = String(VND.format(payItem));
};
render();
addEl.onclick = () => {
  countItem++;
  console.log("test", a);

  render();
};
deleteEl.onclick = () => {
  if (countItem > 1) {
    countItem--;
    render();
  }
};
