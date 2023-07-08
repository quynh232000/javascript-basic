import { store } from "./reduce.js";
import * as actions from "./action.js";

const showInfo = () => {
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
  let imgFile;
  uploadFile.onchange = (e) => {
    //   console.log(e.target.files);
    var fr = new FileReader();
    fr.onload = () => {
      imgUpload.src = fr.result;
      imgFile = fr.result;
    };
    fr.readAsDataURL(e.target.files[0]);
  };
  btnSave.onclick = () => {
    if (inputName.value && imgUpload.src) {
      const dataUpdate = { name: inputName.value, img: imgUpload.src };
      store.dispatch(actions.actionUpdateProfile(dataUpdate));
      location.reload();
    }
  };
};
showInfo();
store.subscribe(() => {
  showInfo();
});
