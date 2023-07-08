import { store } from "./reduce.js";

const imgL = document.querySelector(".profile-img");
const nameL = document.querySelector(".profile-name");
const nameLogin = document.querySelector(".profile-name-login");
const email = document.querySelector(".profile-email");
const phone = document.querySelector(".profile-phone");
const imgUpload = document.querySelector(".profile-img-upload");
const inputName = document.querySelector(".profile-input-name");
const btnSave = document.querySelector(".profile-btn-save");
const uploadFile = document.querySelector(".input-upload-file");

if (store.state.isLogin) {
  if (store.state.userInfo) {
    const info = store.state.userInfo;
    imgL.src = info.img;
    nameL.textContent = info.name;
    nameLogin.textContent = info.email;
    email.textContent = info.email
      .split("@")[0]
      .slice(0, info.email.split("@")[0].length - 4);
    phone.textContent = info.phone.slice(info.phone.length - 2);
    imgUpload.src = info.img;
    inputName.value = info.name;
  }
}
uploadFile.onchange = (e) => {
  console.log(e.target.files);
  var fr = new FileReader();
  fr.onload = () => {
    console.log(fr.result);
  };
  fr.readAsDataURL(files);
};
btnSave.onclick = () => {
  console.log("name", inputName.value);
  console.log("img", imgUpload.files);
};

var fr = new FileReader();
fr.onload = function () {
  let node = document.createElement("div");
  node.classList.add("item");
  node.innerHTML = `<div class="item-wrapper">
                                 <img src=${fr.result} alt="" class="img" />
                                 <div class="img-name">${files.name}</div>
                               </div>`;
  viewEl.appendChild(node);
};
fr.readAsDataURL(files);
