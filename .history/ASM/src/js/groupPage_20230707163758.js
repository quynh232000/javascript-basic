import { dataProducts } from "./data.js";

let q = window.location.search;
let params = new URLSearchParams(q);
const groupName = params.get("group");
let listProduct = [];
if (groupName) {
  listProduct = dataProducts.filter((item) => item.group == groupName);
}
console.log(listProduct[0]);
const listProductEl = document.getElementById("g-list");
