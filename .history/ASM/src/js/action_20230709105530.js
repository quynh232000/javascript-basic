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
export function actionUpdateProfile(payload) {
  return {
    type: "UPDATEPROFILE",
    payload,
  };
}
export function actionAddCart(payload) {
  return {
    type: "ADDCART",
    payload,
  };
}
export function actionUpdateCart(payload) {
  return {
    type: "UPDATECART",
    payload,
  };
}
