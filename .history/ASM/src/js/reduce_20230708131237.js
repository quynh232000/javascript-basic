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
  isLogin: localStorage.getItem("ISLOGIN") || false,
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

// action

// dom event
// const deposit = document.getElementById("deposit");
// const Withdraw = document.getElementById("Withdraw");
// deposit.onclick = () => {
//   store.dispatch(actionDeposit(10));
// };
// Withdraw.onclick = () => {
//   store.dispatch(actionWithdraw(10));
// };
// // listen
// store.subscribe(() => {
//   render();
// });
