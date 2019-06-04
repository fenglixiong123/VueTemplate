import service from '@/utils/ajax'
import method from './method_const'

function apiMenuListByAdminId(id) {
  return service({
    url: '/adminApi/console/admin/menu/findMenuListByAdminId',
    method: method.GET,
    params: {id:id}
  })
}

function apiMenuList(data) {
  return service({
    url: '/adminApi/console/admin/menu/list',
    method: method.POST,
    data
  })
}

function apiMenuListPage(data) {
  return service({
    url: '/adminApi/console/admin/menu/list',
    method: method.POST,
    data
  })
}

function apiMenuGet(id) {
  return service({
    url: `/adminApi/console/admin/menu/${id}`,
    method: method.GET,
  })
}

function apiMenuAdd(data) {
  return service({
    url: '/adminApi/console/admin/menu/',
    method: method.POST,
    data
  })
}

function apiMenuUpdate(data) {
  return service({
    url: '/adminApi/console/admin/menu/',
    method: method.PUT,
    data
  })
}

function apiMenuDelete(id) {
  return service({
    url: `/adminApi/console/admin/menu/${id}`,
    method: method.DELETE,
  })
}

export {
  apiMenuListByAdminId,
  apiMenuGet,
  apiMenuAdd,
  apiMenuUpdate,
  apiMenuDelete,
  apiMenuList,
  apiMenuListPage
}
