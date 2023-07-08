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
  console.log("state:", payload);
  return {
    type: "ISLOGINFORM",
    payload,
  };
}
