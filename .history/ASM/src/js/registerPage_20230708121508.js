import { store } from "./reduce.js";

const formLoginEl = document.getElementById("form-login");
const formSignupEl = document.getElementById("form-signup");
const bodyFormEl = document.querySelector(".body-right");

const Validator = (nameForm) => {
  const formGroup = document.querySelectorAll(".form-group");
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
  btnSubmitEl.onclick = (e) => {
    let data = {};
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
      console.log("data", data);
      // formElement.submit();
    }
  };
};

// login state
if (store.state.isLogin) {
  bodyFormEl.innerHTML = `<form
  action="/ASM/index.html"
  method="GET"
  class="form form-login"
  id="form-login"
>
  <label for="" class="label">Đăng nhập</label>

  <div class="form-group">
    <input
      type="text"
      name="email"
      rules="required|email"
      class="form-control"
      id="email"
      placeholder="Email..."
    />
    <span class="form-message"></span>
  </div>
  <div class="form-group">
    <input
      type="text"
      name="password"
      rules="required"
      class="form-control"
      id="password"
      placeholder="Password..."
    />
    <span class="form-message"></span>
  </div>

  <button class="form-submit login-form" type="submit">Đăng nhập</button>
  <div class="has-account">
    Bạn đã chưa có tài khoản? <span>Đăng kí</span>
  </div>
</form>`;
  Validator("form-login");
} else {
  bodyFormEl.innerHTML = ` <form
  action="/ASM/index.html"
  method="GET"
  class="form form-signup"
  id="form-signup"
>
  <label for="" class="label">Đăng kí</label>

  <div class="form-group">
    <input
      type="text"
      name="phone"
      rules="required"
      class="form-control"
      id="phone"
      placeholder="Phone number..."
    />
    <span class="form-message"></span>
  </div>
  <div class="form-group">
    <input
      type="text"
      name="email"
      rules="required|email"
      class="form-control"
      id="email"
      placeholder="Email..."
    />
    <span class="form-message"></span>
  </div>
  <div class="form-group">
    <input
      type="text"
      name="password"
      rules="required"
      class="form-control"
      id="password"
      placeholder="Password..."
    />
    <span class="form-message"></span>
  </div>
  <div class="form-group">
    <input
      type="text"
      name="confirm-password"
      rules="required"
      class="form-control"
      id="confirm-password"
      placeholder="Confirm password..."
    />
    <span class="form-message"></span>
  </div>

  <button class="form-submit register-form" type="submit">Đăng kí</button>
  <div class="has-account">
    Bạn đã có tài khoản? <span>Đăng nhập</span>
  </div>
</form>`;
  Validator("form-signup");
}
