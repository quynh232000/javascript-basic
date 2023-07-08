function createStore(reducer) {
  let state = reducer(undefined, {});
  const subscribers = [];
  return {
    state: () => {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      subscribers.forEach((subscriber) => {
        subscriber();
      });
    },
    subscribe(subscriber) {
      subscribers.push(subscriber);
    },
  }();
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
      localStorage.setItem("USERINFO", JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    case "ISLOGINFORM":
      console.log("okoko:", action.payload);
      return { ...state, isLoginForm: action.payload };

    default:
      return state;
  }
}

// store
export const store = createStore(reducer);
