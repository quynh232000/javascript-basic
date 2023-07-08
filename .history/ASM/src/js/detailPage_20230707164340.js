import { dataProducts } from "./data.js";

let q = window.location.search;
let params = new URLSearchParams(q);
const idProduct = params.get("id");
