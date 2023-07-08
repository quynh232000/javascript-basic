import { dataProducts } from "./data.js";

let q = window.location.search;
let params = new URLSearchParams(q);
const groupName = params.get("group");
if (groupName) {
}

const listProductEl = document.getElementById("g-list");
