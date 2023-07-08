function createStore(reducer) {
  let state = reducer(undefined, {});

  return {
    getState() {
      return state;
    },
    dispatch(action) {
      // ////
    },
    subscribe(subscribe) {
      // ///
    },
  };
}

const initState = 0;

function bankReducer(state = initState, action) {
  switch (action.type) {
    case "DEPOSIT":
      return state + action.payload;

    case "WITHDRAW":
      return state - action.payload;
    default:
      return state;
  }
}
// store
const store = createStore(bankReducer);
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
