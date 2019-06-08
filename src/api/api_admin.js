import service from '@/utils/ajax'
import method from './method_const'

function apiAdminListPage(data) {
  return service({
    url: '/adminApi/console/admin/list',
    method: method.POST,
    data
  })
}

function apiAdminGet(id) {
  return service({
    url: '/adminApi/console/admin',
    method: method.GET,
    params: { id }
  })
}

function apiAdminAdd(data) {
  return service({
    url: '/adminApi/console/admin',
    method: method.POST,
    data
  })
}

function apiAdminUpdate(data) {
  return service({
    url: '/adminApi/console/admin',
    method: method.PUT,
    data
  })
}

function apiAdminDelete(id) {
  return service({
    url: `/adminApi/console/admin`,
    method: method.DELETE,
    params: { id }
  })
}

function apiAdminFindPossessRole(id) {
  return service({
    url: `/adminApi/console/admin/findPossessRoleByAdminId`,
    method: method.GET,
    params: { id }
  })
}

/**
 * Post请求传输数组
 * 1.利用json
 * 2.如下所示
 * 3.转换成字符串
 */
function apiAdminAssignRole(adminId,roleIds) {
  return service({
    url: '/adminApi/console/admin/assignRoleToAdmin',
    method: method.POST,
    traditional:true,
    params:{
      adminId,
      roleIds : roleIds+''
    }
  })
}

export {
  apiAdminGet,
  apiAdminAdd,
  apiAdminUpdate,
  apiAdminDelete,
  apiAdminListPage,
  apiAdminAssignRole,
  apiAdminFindPossessRole
}
