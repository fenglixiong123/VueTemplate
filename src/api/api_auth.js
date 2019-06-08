import service from '@/utils/ajax'
import method from './method_const'

function apiLogin(data) {
  return service({
    url: '/adminApi/console/admin/login',
    method: method.POST,
    data
  })
}

function apiUserInfo() {
  return service({
    url: '/adminApi/console/admin/userInfo',
    method: method.GET,
  })
}

function apiLogout() {
  return service({
    url: '/adminApi/console/admin/logout',
    method: method.POST
  })
}

export {
  apiLogin,
  apiLogout,
  apiUserInfo
}
