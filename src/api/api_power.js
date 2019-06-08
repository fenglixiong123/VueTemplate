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

function apiPowerTree() {
  return service({
    url: '/adminApi/console/admin/power/tree',
    method: method.GET,
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
    url: `/adminApi/console/admin/power`,
    method: method.GET,
    params: { id }
  })
}

function apiPowerAdd(data) {
  return service({
    url: '/adminApi/console/admin/power',
    method: method.POST,
    data
  })
}

function apiPowerUpdate(data) {
  return service({
    url: '/adminApi/console/admin/power',
    method: method.PUT,
    data
  })
}

function apiPowerDelete(id) {
  return service({
    url: `/adminApi/console/admin/power`,
    method: method.DELETE,
    params: { id }
  })
}

export {
  apiPowerListByAdminId,
  apiPowerGet,
  apiPowerAdd,
  apiPowerUpdate,
  apiPowerDelete,
  apiPowerList,
  apiPowerTree,
  apiPowerListPage
}
