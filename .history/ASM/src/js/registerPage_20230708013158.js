function Validator(selector) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var formRules = {};
  var validatorRules = {
    required: function (value) {
      return value ? undefined : "Vui lòng nhập trường này";
    },
    email: function (value) {
      regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "It must be an email";
    },
    min: function (min) {
      return function (value) {
        return value.length >= min ? undefined : `its min ${min} keys`;
      };
    },
  };
  var formElement = document.querySelector(selector);
  if (formElement) {
    var inputs = formElement.querySelectorAll("[name][rules]");
    for (var input of inputs) {
      var rules = input.getAttribute("rules").split("|");
      for (var rule of rules) {
        var ruleInfo;
        var isRuleHasValue = rule.includes(":");
        if (isRuleHasValue) {
          ruleInfo = rule.split(":");
          rule = ruleInfo[0];
        }
        var ruleFunc = validatorRules[rule];
        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1]);
        }
        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
      }

      // lawng nghe input

      input.onblur = handleValidate;
      input.oninput = handleClearError;
    }
    // ham onblur
    function handleValidate(e) {
      var rules = formRules[e.target.name];
      var errorMessage;

      for (var rule of rules) {
        errorMessage = rule(e.target.value);
        if (errorMessage) break;
      }

      // neu co loi hienj message loi
      if (errorMessage) {
        var formGroup = getParent(e.target, ".form-group");
        if (formGroup) {
          formGroup.classList.add("invalid");
          var formMessage = formGroup.querySelector(".form-message");
          if (formMessage) {
            formMessage.innerText = errorMessage;
          }
        }
      }
      return !errorMessage;

      // console.log(errorMessage)
    }

    function handleClearError(e) {
      var formGroup = getParent(e.target, ".form-group");
      if (formGroup.classList.contains("invalid")) {
        formGroup.classList.remove("invalid");
        var formMessage = formGroup.querySelector(".form-message");
        if (formMessage) {
          formMessage.innerText = "";
        }
      }
    }
  }
  // xu li hanh vi submit
  formElement.onsubmit = function (e) {
    e.preventDefault();

    var inputs = formElement.querySelectorAll("[name][rules]");
    var isValid = true;

    // for (var input of inputs) {
    //   if (!handleValidate({ target: input })) {
    //     isValid = false;
    //   }
    // }
    if (isValid) {
      if (typeof options.onSubmit === "function") {
        var enableInputs = formElement.querySelectorAll("[name]");
        var formValues = Array.from(enableInputs).reduce(function (values) {
          return values;
        }, {});
        console.log(formValues);
        // options.onSubmit(formValues);
      } else {
        formElement.submit();
      }
    }
  };
}

//
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
          formMessage.textContent = "Vui lòng nhập mật khẩu nhiều hơn 6 kí tự.";
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
btnSubmitEl.onclick = (e) => {
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
          formMessage.textContent = "Vui lòng nhập mật khẩu nhiều hơn 6 kí tự.";
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
      }
    }
  });
  if (isInvalid) {
    console.log("okoko");
    e.submit();
  }
};
