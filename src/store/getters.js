
export default {
  token: state => state.auth.token,
  userInfo: state => state.auth.userInfo,
  powerList: state => state.access.powerList,
}
