let q = window.location.search;
let params = new URLSearchParams(q);
console.log(params.get("group"));
