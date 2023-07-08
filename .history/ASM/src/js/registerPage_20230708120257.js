import { store } from "./reduce.js";

const formGroup = document.querySelectorAll(".form-group");
const formLoginEl = document.getElementById("form-login");
const formSignupEl = document.getElementById("form-signup");

const Validator = (nameForm) => {
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
  const btnSubmitEl = document.querySelector("." + nameForm);
  const formElement = document.getElementById(nameForm);
  let data = {};
  btnSubmitEl.onclick = (e) => {
    console.log("okokok");
    // e.preventDefault();
    let isInvalid = true;
    formGroup.forEach((element) => {
      const formControl = element.querySelector(".form-control");
      console.log(formControl.value);
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

// login state
if (store.state.isLogin) {
  console.log("login");
  if (formLoginEl.classList.contains("hidden")) {
    formLoginEl.classList.remove("hidden");
  }
  if (!formSignupEl.classList.contains("hidden")) {
    formSignupEl.classList.add("hidden");
  }
  Validator("login-form");
} else {
  if (formSignupEl.classList.contains("hidden")) {
    formSignupEl.classList.remove("hidden");
  }
  if (!formLoginEl.classList.contains("hidden")) {
    formLoginEl.classList.add("hidden");
  }
  Validator("register-form");
}
