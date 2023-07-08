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
};

function reducer(state = initState, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("ISLOGIN", action.payload);
      return { ...state, isLogin: action.payload };
    case "USERINFO":
      localStorage.setItem("USERINFO", JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };

    default:
      return state;
  }
}

// store
export const store = createStore(reducer);
