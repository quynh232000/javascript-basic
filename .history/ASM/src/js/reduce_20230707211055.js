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
  a: 0,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case "DEPOSIT":
      return { ...state, a: a + action.payload };

    case "WITHDRAW":
      return { ...state, a: a - action.payload };
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
  output.innerText = store.getState();
}
