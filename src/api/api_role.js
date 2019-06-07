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

function apiRoleFindPossessMenu(id) {
  return service({
    url: `/adminApi/console/admin/role/findPossessMenuByRoleId/${id}`,
    method: method.GET,
  })
}

function apiRoleFindPossessPower(id) {
  return service({
    url: `/adminApi/console/admin/role/findPossessPowerByRoleId/${id}`,
    method: method.GET,
  })
}

function apiRoleAssignMenu(roleId,menuIds) {
  return service({
    url: '/adminApi/console/admin/role/assignMenuToRole',
    method: method.POST,
    traditional:true,
    params:{
      roleId,
      menuIds : menuIds + ''
    }
  })
}

function apiRoleAssignPower(roleId,powerIds) {
  return service({
    url: '/adminApi/console/admin/role/assignPowerToRole',
    method: method.POST,
    traditional:true,
    params:{
      roleId,
      powerIds : powerIds + ''
    }
  })
}


export {
  apiRoleGet,
  apiRoleAdd,
  apiRoleUpdate,
  apiRoleDelete,
  apiRoleList,
  apiRoleListPage,
  apiRoleAssignMenu,
  apiRoleAssignPower,
  apiRoleFindPossessMenu,
  apiRoleFindPossessPower,
}
