export function actionLogin(payload) {
  return {
    type: "LOGIN",
    payload,
  };
}
export function actionUserInfo(payload) {
  return {
    type: "USERINFO",
    payload,
  };
}
export function actionIsLoginForm(payload) {
  return {
    type: "ISLOGINFORM",
    payload,
  };
}
