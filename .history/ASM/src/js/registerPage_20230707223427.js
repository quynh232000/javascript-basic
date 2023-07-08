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
    number: function (value) {
      return +value > 0 ? undefined : `Vui lòng nhập số tiền lớn hơn 0`;
    },
    email: function (value) {
      regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : "Vui lòng nhập đúng dịnh dạng email";
    },
  };
  var formElement = document.querySelector(selector);
  if (formElement) {
    var inputs = formElement.querySelectorAll("[name][rules]");
    for (var input of inputs) {
      var rules = input.getAttribute("rules").split("|");
      // kiem tra cac rule trong 1 input
      for (var rule of rules) {
        var ruleFunc = validatorRules[rule];
        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
      }

      // lawng nghe input
      // ham onblur
      input.onblur = handleValidate;
      input.oninput = handleClearError;
    }

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
  //
  // ngoại noi thanh
  const placesEl = document.getElementsByName("place");
  const groupPayEl = document.querySelector(".form-group-pay");
  placesEl.forEach((element) => {
    element.oninput = () => {
      if (element.checked) {
        if (element.id == "place2") {
          groupPayEl.classList.remove("hidden");
          groupPayEl.innerHTML = `<label for="pay-cost" class="form-label">Phí vận chuyển</label>
  
            <input
              type="pay-cost"
              name="pay-cost"
              rules="required|number"
              class="form-control"
              id="pay-cost"
              placeholder="Vd: 45 000"
            />
            <span class="form-message"></span>`;
          Validator("#buy-form");
        } else {
          groupPayEl.classList.add("hidden");
          groupPayEl.innerHTML = "";
        }
      }
    };
  });
  // xu li hanh vi submit
  formElement.onsubmit = function (e) {
    e.preventDefault();

    var inputs = formElement.querySelectorAll("[name][rules]");
    var isValid = true;

    for (var input of inputs) {
      if (!handleValidate({ target: input })) {
        isValid = false;
      }
    }
    if (isValid) {
      toastEl.classList.remove("hidden");
      toastEl.textContent = "Đặt hàng thành công!!!";
      setTimeout(() => {
        toastEl.classList.add("hidden");
      }, 4000);
    }
  };
}
Validator("#buy-form");
