
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token';

function getToken() {
  return Cookies.get(TokenKey)
}

//设置半小时过期
function setToken(token) {
  if(!token) {return;}
  let maxAge = new Date(new Date().getTime() + 60 * 60 * 1000);
  Cookies.set(TokenKey, token,{
    expires: maxAge
  })
}

function removeToken() {
  Cookies.remove(TokenKey)
}

export {
  getToken,
  setToken,
  removeToken
}
