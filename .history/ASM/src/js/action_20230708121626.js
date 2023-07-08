export function actionDeposit(payload) {
  return {
    type: "LOGIN",
    payload,
  };
}
export function actionWithdraw(payload) {
  return {
    type: "USERINFO",
    payload,
  };
}
