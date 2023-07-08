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
      // localStorage.setItem("ISLOGINFORM", JSON.stringify(action.payload));
      return { ...state, isLoginForm: action.payload };

    default:
      return state;
  }
}

// store
export const store = createStore(reducer);
