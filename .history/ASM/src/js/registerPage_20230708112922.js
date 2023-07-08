import { store } from "./reduce.js";

const formGroup = document.querySelectorAll(".form-group");
const formLoginEl = document.querySelector(".form-login");
const formSignupEl = document.querySelector(".form-signup");

if (store.state.isLogin) {
  console.log("okoko", store.state.isLogin);
}

const Validator = () => {
  let pass;
  formGroup.forEach((element) => {
    const formControl = element.querySelector(".form-control");
    const formMessage = element.querySelector(".form-message");
    formControl.onblur = (e) => {
      const value = e.target.value;
      if (!value) {
        element.classList.add("invalid");
        formMessage.textContent = "Vui lòng nhập trường này!";
      } else {
        if (e.target.name == "email") {
          const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          const check = regex.test(value);
          if (!check) {
            element.classList.add("invalid");
            formMessage.textContent = "Vui lòng nhập đúng định dạng email";
          }
        }
        if (e.target.name == "password") {
          if (value.length < 6) {
            element.classList.add("invalid");
            formMessage.textContent =
              "Vui lòng nhập mật khẩu nhiều hơn 6 kí tự.";
          } else {
            pass = value;
          }
        }
        if (e.target.name == "confirm-password") {
          if (value != pass) {
            element.classList.add("invalid");
            formMessage.textContent = "Mật khẩu xác nhận không đúng.";
          }
        }
      }
    };
    formControl.oninput = (e) => {
      if (element.classList.contains("invalid")) {
        element.classList.remove("invalid");
        formMessage.textContent = "";
      }
    };
  });
  const btnSubmitEl = document.querySelector(".form-submit");
  const formElement = document.getElementById("register-form");
  let data = {};
  formElement.onsubmit = (e) => {
    e.preventDefault();
    let isInvalid = true;
    formGroup.forEach((element) => {
      const formControl = element.querySelector(".form-control");
      const formMessage = element.querySelector(".form-message");
      const value = formControl.value;
      if (!value) {
        element.classList.add("invalid");
        formMessage.textContent = "Vui lòng nhập trường này!";
        isInvalid = false;
      } else {
        if (formControl.name == "email") {
          const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          const check = regex.test(value);
          if (!check) {
            element.classList.add("invalid");
            formMessage.textContent = "Vui lòng nhập đúng định dạng email";
            isInvalid = false;
          }
        }
        if (formControl.name == "password") {
          if (value.length < 6) {
            element.classList.add("invalid");
            formMessage.textContent =
              "Vui lòng nhập mật khẩu nhiều hơn 6 kí tự.";
            isInvalid = false;
          } else {
            pass = value;
          }
        }
        if (formControl.name == "confirm-password") {
          if (value != pass) {
            element.classList.add("invalid");
            formMessage.textContent = "Mật khẩu xác nhận không đúng.";
            isInvalid = false;
          }
        } else {
          data = { ...data, [formControl.name]: formControl.value };
        }
      }
    });
    if (isInvalid) {
      console.log("okoko", data);
      // formElement.submit();
    }
  };
};
Validator();
