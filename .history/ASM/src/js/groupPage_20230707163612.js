import { dataProducts } from "./data.js";

let q = window.location.search;
let params = new URLSearchParams(q);
const groupName = params.get("group");
let listProduct;
if (groupName) {
  listProduct = dataProducts.fill((item) => item.group == groupName);
}
console.log(listProduct);
const listProductEl = document.getElementById("g-list");
