function createStore(reducer) {
  let state = reducer(undefined, {});
}

const initState = 0;

function bankReducer(state = initState, action) {
  switch (action.type) {
    case "DEPOSIT":
      return state + action.payload;

    case "WITHDRAW":
      return state + action.payload;
    default:
      return state;
  }
}
