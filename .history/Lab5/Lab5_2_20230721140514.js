const data = [
  {
    id: 0,
    name: "iPhone 15 Pro Max 512GB",
    price: 30490000,
    img: "../img/phone.jpg",
  },
  {
    id: 1,
    name: "Samsung Galaxy Z Flip4 5G 128GB",
    price: 4500900,
    img: "../img/phone1.jpg",
  },
  {
    id: 2,
    name: "Máy lọc nước RO Sunhouse",
    price: 30490000,
    img: "../img/phone2.jpg",
  },
  {
    id: 3,
    name: "MacBook Air 13 2020 M1 256GB",
    price: 13490000,
    img: "../img/phone3.jpg",
  },
  {
    id: 4,
    name: "iPad Gen 9 2021 10.2 inch WiFi 64GB",
    price: 13000800,
    img: "../img/phone4.jpg",
  },
  {
    id: 5,
    name: "Quạt điều hoà Kangaroo KG50F64",
    price: 30490000,
    img: "../img/phone5.jpg",
  },
  {
    id: 6,
    name: "Máy lọc nước RO Sunhouse 7 lõi SHA8868K",
    price: 23000000,
    img: "../img/phone6.jpg",
  },
  {
    id: 7,
    name: "Quạt điều hoà Kangaroo KG50F64",
    price: 14260000,
    img: "../img/phone7.jpg",
  },
  {
    id: 8,
    name: "iPad Gen 9 2021 10.2 inch WiFi 64GB",
    price: 7890000,
    img: "../img/phone3.jpg",
  },
  {
    id: 9,
    name: "Nồi lẩu điện Sunhouse 3 lít SHD4521",
    price: 30490000,
    img: "../img/phone4.jpg",
  },
  {
    id: 10,
    name: "",
    price: 12000650,
    img: "../img/phone5.jpg",
  },
  {
    id: 11,
    name: "Máy lọc nước RO Sunhouse 7 lõi SHA8868K",
    price: 5680000,
    img: "../img/phone6.jpg",
  },
  {
    id: 12,
    name: "Nồi lẩu điện Sunhouse 3 lít SHD4521",
    price: 30490000,
    img: "../img/phone7.jpg",
  },
];
let listCart = [];
const listProductEl = document.getElementById("list-product");
const toastEl = document.querySelector(".toast");
const cartCountEl = document.querySelector(".cart-count");

// them sp
const modalAdd = document.querySelector(".model-add");
const formAdd = document.querySelector(".form-add");
if (formAdd) {
  formAdd.onsubmit = (e) => {
    e.preventDefault();
    let data = {};
    formAdd.querySelectorAll("input").forEach((element) => {
      data = { ...data, [element.name]: element.value };
    });
    console.log("okok", data);
  };
}

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

let listHtml = data.map((item, index) => {
  return `
  <div class="product-item">
    <div class="home-product-item">
      <div
        class="home-product-item__img"
        style="
          background-image: url(${item.img});
        "
      ></div>
      <h4 class="home-product-item__name">${item.name}</h4>
      <div class="home-product-item__price">
        <span class="home-product-item__price-old">${VND.format(
          (item.price * 1.1).toFixed(0)
        )}</span>
        <span class="home-product-item__price-current">${VND.format(
          item.price
        )}</span>
      </div>
      <div class="home-product-item__action">
        <span class="home-product-item__heart">
          <!-- home-product-item__heart--liked -->
          <i class="home-product-item__heart-icon-empty far fa-heart"></i>
          <i class="home-product-item__heart-icon-fill fas fa-heart"></i>
        </span>
        <div class="home-product-item__rating">
          <i class="home-product-item__star-gold fas fa-star"></i>
          <i class="home-product-item__star-gold fas fa-star"></i>
          <i class="home-product-item__star-gold fas fa-star"></i>
          <i class="home-product-item__star-gold fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <span class="home-product-item__sold">45 đã bán</span>
      </div>
      <div class="home-product-item__origin">
        <div class="add-cart" data-index=${index}>Thêm vào giỏ hàng</div>
      </div>
      <div class="home-product-item__favourite">
        <i class="fas fa-check"></i>
        <span>Yêu thích</span>
      </div>
      <div class="home-product-item__sale-off">
        <span class="home-product-item__sale-off-percent">43%</span>
        <span class="home-product-item__sale-off-label">GIẢM</span>
      </div>
    </div>
  </div>
  `;
});
listProductEl.innerHTML = listHtml.join("");

// them vao gio hang
listProductEl.onclick = (e) => {
  const node = e.target.closest(".add-cart");
  if (node) {
    let index = node.dataset.index;
    index && listCart.push(index);
    toastEl.classList.remove("hidden");
    toastEl.textContent = "Đã thêm vào giỏ hàng";
    cartCountEl.textContent = String(listCart.length);
    setTimeout(() => {
      toastEl.classList.add("hidden");
    }, 4000);
  }
};

// hien thi gio hang
const cartEl = document.querySelector(".cart-body");
const modelEl = document.getElementById("modal");
const model1El = document.querySelector(".wrapper1");
const closeEl = document.querySelector(".icon-close");
const modalWrapperEl = document.querySelector(".container1");
const countCartEl = document.querySelector(".count-product");

const showListCartEl = document.querySelector(".list-product");
const totalEl = document.querySelector(".total");
const totalPayEl = document.querySelector(".total-pay");
const btnEl = document.querySelector(".btn-finish");

// open and close modal

// total price
const totalPrice = () => {
  return listCart.reduce((a, b) => a + data[b].price, 0);
};
// render cart
const renderCart = () => {
  const listCartHtml = listCart.map((i, index) => {
    return `
          <div class="item1">
            <div class="item-image">
              <image class="image-product" src=${data[i].img} />
            </div>
            <div class="info-product">
              <div>
                <div class="name-product">${data[i].name}</div>
              </div>
              <ul class="detail-product">
                <li>Tặng gói iCloud 50GB miễn phí 3 tháng</li>
                <li>Giảm đến 20% củ sạc nhanh 25W</li>
              </ul>
            </div>
            <div class="info-right-product">
              <p>${VND.format(data[i].price)}</p>
              <span class="delete-cart" data-cart=${index} > Xóa </span>
            </div>
          </div>
    `;
  });
  showListCartEl.innerHTML = listCartHtml.join("");

  const price = totalPrice();
  totalEl.textContent = VND.format(price);
  totalPayEl.textContent =
    listCart.length > 0 ? VND.format(price - 567000) : VND.format(0);
};
// open
cartEl.onclick = () => {
  modelEl.classList.remove("hidden");
  let text = "";
  if (listCart.length > 0) {
    text = `Bạn có ${listCart.length} sản phẩm trong giỏ hàng`;
  } else {
    text = "Bạn chưa có sản phẩm nào";
  }
  countCartEl.textContent = text;
  // show product cart
  renderCart();
};
// delete item in cart

showListCartEl.onclick = (e) => {
  const node = e.target.closest(".delete-cart");
  if (node) {
    const index = node.dataset.cart;
    listCart.splice(index, 1);
    renderCart();
    cartCountEl.textContent = String(listCart.length);
    let text = "";
    if (listCart.length > 0) {
      text = `Bạn có ${listCart.length} sản phẩm trong giỏ hàng`;
    } else {
      text = "Bạn chưa có sản phẩm nào";
    }
    countCartEl.textContent = text;
  }
};

// close
model1El.onclick = () => {
  modelEl.classList.add("hidden");
};
closeEl.onclick = (e) => {
  modelEl.classList.add("hidden");
};
modalWrapperEl.onclick = (e) => {
  e.stopPropagation();
};
btnEl.onclick = () => {
  if (listCart.length > 0) {
    modelEl.classList.add("hidden");
    listCart = [];
    setTimeout(() => {
      toastEl.textContent = "Đặt hàng thành công!";
    }, 2000);
  }
};
