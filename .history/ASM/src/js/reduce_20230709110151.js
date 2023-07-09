function createStore(reducer) {
  let state = reducer(undefined, {});
  const subscribers = [];
  return {
    state: state,
    dispatch(action) {
      state = reducer(state, action);
      subscribers.forEach((subscriber) => {
        subscriber();
      });
    },
    subscribe(subscriber) {
      subscribers.push(subscriber);
    },
  };
}

const initState = {
  isLogin: JSON.parse(localStorage.getItem("ISLOGIN")) || false,
  userInfo: JSON.parse(localStorage.getItem("USERINFO")) || {},
  isLoginForm: true,
  cart: JSON.parse(localStorage.getItem("CARTLIST")) || [],
  totalCount: JSON.parse(localStorage.getItem("TOTALCOUNT")) || 0,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("ISLOGIN", action.payload);
      return { ...state, isLogin: action.payload };
    case "USERINFO":
      let data = action.payload;
      data = {
        ...data,
        img: "https://i.pinimg.com/originals/c0/4b/01/c04b017b6b9d1c189e15e6559aeb3ca8.png",
        name: data.email.split("@")[0],
      };
      localStorage.setItem("USERINFO", JSON.stringify(data));
      return { ...state, userInfo: data };
    case "ISLOGINFORM":
      return { ...state, isLoginForm: action.payload };
    case "UPDATEPROFILE":
      const dataUpdate = { ...state.userInfo, ...action.payload };
      localStorage.setItem("USERINFO", JSON.stringify(dataUpdate));
      return { ...state, isLoginForm: dataUpdate };

    case "ADDCART":
      const dataAddCart = [...state.cart, action.payload];
      const totalcount = +action.payload.count + +state.totalCount;
      localStorage.setItem("CARTLIST", JSON.stringify(dataAddCart));
      localStorage.setItem("TOTALCOUNT", JSON.stringify(totalcount));
      return { ...state, cart: dataAddCart, totalCount: totalcount };

    case "UPDATECART":
      const dataUpdateCart = action.payload;
      const totalUpdateCount = action.payload.reduce((a, b) => b.count + a, 0);
      localStorage.setItem("CARTLIST", JSON.stringify(dataUpdateCart));
      localStorage.setItem("TOTALCOUNT", JSON.stringify(totalUpdateCount));
      return { ...state, cart: dataUpdateCart, totalCount: totalUpdateCount };

    default:
      return state;
  }
}

// store
export const store = createStore(reducer);
