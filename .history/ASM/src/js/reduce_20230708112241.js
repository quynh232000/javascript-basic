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
  };
}

const initState = {
  userInfo: { isLogin: true },
};

function reducer(state = initState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, userInfo: { ...(state.userInfo + action.payload) } };

    case "WITHDRAW":
      return { ...state, user: state.user - action.payload };
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
// // render
// function render() {
//   const output = document.getElementById("show");
//   output.innerText = store.getState().user;
//   console.log(store.getState().test);
// }
{
  /* <h1 id="show">12</h1>
      <button id="deposit">Deposit</button>
      <button id="Withdraw">Withdraw</button> */
}
