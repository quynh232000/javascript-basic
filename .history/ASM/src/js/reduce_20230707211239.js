function createStore(reducer) {
  let state = reducer(undefined, {});
  const subscribers = [];
  return {
    getState() {
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
  test: true,
  user: 0,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case "DEPOSIT":
      return { ...state, user: action.payload };

    case "WITHDRAW":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
// store
const store = createStore(reducer);

// action
function actionDeposit(payload) {
  return {
    type: "DEPOSIT",
    payload,
  };
}
function actionWithdraw(payload) {
  return {
    type: "WITHDRAW",
    payload,
  };
}

// dom event
const deposit = document.getElementById("deposit");
const Withdraw = document.getElementById("Withdraw");
deposit.onclick = () => {
  store.dispatch(actionDeposit(10));
};
Withdraw.onclick = () => {
  store.dispatch(actionWithdraw(10));
};
// listen
store.subscribe(() => {
  render();
});
// render
function render() {
  const output = document.getElementById("show");
  output.innerText = store.getState().user;
  console.log(store.getState().test);
}
