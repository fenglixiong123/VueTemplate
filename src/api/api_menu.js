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

function apiMenuTree() {
  return service({
    url: '/adminApi/console/admin/menu/tree',
    method: method.GET,
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
    url: `/adminApi/console/admin/menu`,
    method: method.GET,
    params: { id }
  })
}

function apiMenuAdd(data) {
  return service({
    url: '/adminApi/console/admin/menu',
    method: method.POST,
    data
  })
}

function apiMenuUpdate(data) {
  return service({
    url: '/adminApi/console/admin/menu',
    method: method.PUT,
    data
  })
}

function apiMenuDelete(id) {
  return service({
    url: `/adminApi/console/admin/menu`,
    method: method.DELETE,
    params: { id }
  })
}

export {
  apiMenuListByAdminId,
  apiMenuGet,
  apiMenuAdd,
  apiMenuUpdate,
  apiMenuDelete,
  apiMenuList,
  apiMenuTree,
  apiMenuListPage
}
