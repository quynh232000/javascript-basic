import { store } from "./reduce.js";

const imgL = document.querySelector(".profile-img");
const nameL = document.querySelector(".profile-name");
const nameLogin = document.querySelector(".profile-name-login");
const email = document.querySelector(".profile-email");
const phone = document.querySelector(".profile-phone");
const imgUpload = document.querySelector(".profile-img-upload");
const inputName = document.querySelector(".profile-input-name");

if (store.state.isLogin) {
  if (store.state.userInfo) {
    const info = store.state.userInfo;
    imgL.src = info.img;
    nameL.textContent = info.email.split("@")[0];
    nameLogin.textContent = info.email;
    email.textContent = info.email
      .split("@")[0]
      .slice(0, info.email.split("@")[0].length - 4);
    phone.textContent = info.phone.slice(info.phone.length - 2);
    imgUpload.src = info.img;
    inputName.value = info.email.split("@")[0];
  }
}
