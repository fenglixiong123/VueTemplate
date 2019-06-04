import service from '@/utils/ajax'
import method from './method_const'

function apiRoleList(data) {
  return service({
    url: '/adminApi/console/admin/role/list',
    method: method.POST,
    data
  })
}

function apiRoleListPage(data) {
  return service({
    url: '/adminApi/console/admin/role/list',
    method: method.POST,
    data
  })
}

function apiRoleGet(id) {
  return service({
    url: `/adminApi/console/admin/role/${id}`,
    method: method.GET,
  })
}

function apiRoleAdd(data) {
  return service({
    url: '/adminApi/console/admin/role/',
    method: method.POST,
    data
  })
}

function apiRoleUpdate(data) {
  return service({
    url: '/adminApi/console/admin/role/',
    method: method.PUT,
    data
  })
}

function apiRoleDelete(id) {
  return service({
    url: `/adminApi/console/admin/role/${id}`,
    method: method.DELETE,
  })
}

export {
  apiRoleGet,
  apiRoleAdd,
  apiRoleUpdate,
  apiRoleDelete,
  apiRoleList,
  apiRoleListPage,
}
