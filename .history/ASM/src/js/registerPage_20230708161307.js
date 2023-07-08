import { store } from "./reduce.js";
import * as actions from "./action.js";

// validate
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
  const formElement = document.getElementById(nameForm);
  formElement.onsubmit = (e) => {
    e.preventDefault();
    let isInvalid = true;
    let data = {};
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
          isInvalid = true;
          data = { ...data, [formControl.name]: formControl.value };
        }
      }
    });
    if (isInvalid) {
      if (store.state.isLogin) {
        // login
        const msgFail = document.querySelector(".login-fail");
        const loadingEl = document.querySelector(".loading");
        const info = store?.state?.userInfo;
        if (info) {
          console.log(info);
          if (info.email == data.email && info.password == data.password) {
            loadingEl.classList.remove("hidden");
            msgFail.textContent = "";
            setTimeout(() => {
              store.dispatch(actions.actionLogin(true));
              window.location.href = "/ASM";
            }, 3000);
          } else {
            msgFail.textContent = "Thông tin đăng nhập không chính xác!";
          }
        }
      } else {
        // register
        store.dispatch(actions.actionUserInfo(data));
        store.dispatch(actions.actionLogin(true));
      }
    }
  };
};

// login state
// store.subscribe(() => {
//   render();
// });

const render = () => {
  const bodyFormEl = document.querySelector(".body-right");
  console.log(store.state.isLogin);
  if (store.state.isLoginForm) {
    bodyFormEl.innerHTML = `<form
    action="/ASM/index.html"
    method="GET"
    class="form"
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
    <div class="login-fail"></div>
    <button class="form-submit login-form" type="submit">Đăng nhập</button>
    <div class="has-account">
      Bạn đã chưa có tài khoản? <span class="btn-register">Đăng kí</span>
    </div>
  </form>`;
    Validator("form-login");
    const btnRegister = document.querySelector(".btn-register");
    btnRegister.onclick = () => {
      store.dispatch(actions.actionIsLoginForm(false));
    };
  } else {
    bodyFormEl.innerHTML = ` <form
    action="/ASM/index.html"
    method="GET"
    class="form"
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
};
render();
