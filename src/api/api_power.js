import service from '@/utils/ajax'
import method from './method_const'

function apiPowerListByAdminId(id) {
  return service({
    url: '/adminApi/console/admin/findPowerListByAdminId',
    method: method.GET,
    params: {id:id}
  })
}

function apiPowerList(data) {
  return service({
    url: '/adminApi/console/admin/power/list',
    method: method.POST,
    data
  })
}

function apiPowerListPage(data) {
  return service({
    url: '/adminApi/console/admin/power/list',
    method: method.POST,
    data
  })
}

function apiPowerGet(id) {
  return service({
    url: `/adminApi/console/admin/power/${id}`,
    method: method.GET,
  })
}

function apiPowerAdd(data) {
  return service({
    url: '/adminApi/console/admin/power/',
    method: method.POST,
    data
  })
}

function apiPowerUpdate(data) {
  return service({
    url: '/adminApi/console/admin/power/',
    method: method.PUT,
    data
  })
}

function apiPowerDelete(id) {
  return service({
    url: `/adminApi/console/admin/power/${id}`,
    method: method.DELETE,
  })
}

export {
  apiPowerListByAdminId,
  apiPowerGet,
  apiPowerAdd,
  apiPowerUpdate,
  apiPowerDelete,
  apiPowerList,
  apiPowerListPage
}
