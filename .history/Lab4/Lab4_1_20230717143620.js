let arr = [
  {
    id: 1,
    name: "Áo nam",
    model: "GUCCI",
    cost: "120.000",
    detail:
      "W3Schools is optimized for learning and training. Examples mightW3Schools is optimized for learning and training. Examples mightW3Schools is optimized for learning and training. Examples might",
  },
  {
    id: 2,
    name: "Phone",
    model: "GUCCI",
    cost: "120.000",
    detail:
      "W3Schools is optimized for learning and training. Examples mightW3Schools is optimized for learning and training. Examples mightW3Schools is optimized for learning and training. Examples might",
  },
  {
    id: 3,
    name: "Technology",
    model: "GUCCI",
    cost: "120.000",
    detail:
      "W3Schools is optimized for learning and training. Examples mightW3Schools is optimized for learning and training. Examples mightW3Schools is optimized for learning and training. Examples might",
  },
];

const listEl = document.getElementById("info");
const nameEl = document.querySelector(".input-name");
const modelEl = document.querySelector(".input-model");
const costEl = document.querySelector(".input-cost");
const detailEl = document.querySelector(".input-detail");
const createEl = document.querySelector(".btn-create");
// modal
const modalEl = document.querySelector(".modal");
const modalChildEl = document.querySelector(".model-wrapper");
const mNameEl = document.querySelector(".b-name");
const mModelEl = document.querySelector(".b-model");
const mCostEl = document.querySelector(".b-cost");
const mDetailEl = document.querySelector(".b-detail");
const mCloselEl = document.querySelector(".btn-close");

let detailInfo = {};

// render list array
const renderList = () => {
  let html = arr.map((item, index) => {
    return `
          <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.model}</td>
          <td>${item.cost}</td>
          <td class="detail" data-index=${index}>Xem chi tiết</td>
          </tr>
      `;
  });
  html.unshift(` <tr>
                  <th>Id</th>
                  <th>Tên sản phẩm</th>
                  <th>Thương hiệu</th>
                  <th>Giá</th>
                  <th>Thông tin</th>
              </tr>`);
  listEl.innerHTML = html.join("");
};
renderList();

// get info

createEl.onclick = () => {
  const data = {
    id: arr.length + 1,
    name: nameEl.value,
    model: modelEl.value,
    cost: costEl.value,
    detail: detailEl.value,
  };
  arr.push(data);
  renderList();
  nameEl.value = "";
  modelEl.value = "";
  costEl.value = "";
  detailEl.value = "";
};
// see detail
listEl.onclick = (e) => {
  console.log(e);
  let node = e.target.closest(".detail");
  if (node) {
    let index = node.dataset.index;
    if (index) {
      detailInfo = arr[index];
      modalEl.classList.remove("hidden");

      mNameEl.textContent = detailInfo.name;
      mModelEl.textContent = detailInfo.model;
      mCostEl.textContent = detailInfo.cost;
      mDetailEl.textContent = detailInfo.detail;
    }
  }
};
modalChildEl.onclick = (e) => {
  e.stopPropagation();
};

// close modal
mCloselEl.onclick = () => {
  modalEl.classList.add("hidden");
  detailInfo = {};
};
modalEl.onclick = () => {
  modalEl.classList.add("hidden");
  detailInfo = {};
};
