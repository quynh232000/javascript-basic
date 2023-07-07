let arr = [
  {
    id: 1,
    name: "Nguyễn Văn Quynh",
    score: 8,
    level: "Giỏi",
  },
  {
    id: 2,
    name: "Nguyễn Văn Quynh",
    score: 4,
    level: "Giỏi",
  },
];

const listEl = document.getElementById("info");
const nameEl = document.querySelector(".input-name");
const scoreEl = document.querySelector(".input-score");
const createEl = document.querySelector(".btn-create");
const msgEl = document.querySelector(".msg");
// modal

// render list array
const renderList = () => {
  let html = arr.map((item, index) => {
    let avg = item.score >= 5 ? "ĐẬU" : "RỚT";

    return `
          <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.score}</td>
          <td>${avg}</td>
          </tr>
      `;
  });
  html.unshift(` <tr>
                  <th>STT</th>
                  <th>Tên sinh Viên</th>
                  <th>Điểm TB</th>
                  <th>Học lực</th>
              </tr>`);
  listEl.innerHTML = html.join("");
};
renderList();

// get info

createEl.onclick = () => {
  scoreEl.classList.remove("validate");
  const data = {
    id: arr.length + 1,
    name: nameEl.value,
    score: scoreEl.value,
  };
  if (data.name && data.score) {
    if (isNaN(data.score)) {
      msgEl.textContent = "Vui lòng nhập số!";
      scoreEl.classList.add("validate");
    } else {
      msgEl.textContent = "";
      arr.push(data);
      renderList();
      nameEl.value = "";
      scoreEl.value = "";
    }
  } else {
    msgEl.textContent = "Vui lòng nhập thông tin!!!";
  }
};
