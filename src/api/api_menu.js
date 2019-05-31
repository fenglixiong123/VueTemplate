import service from '@/utils/ajax'
import method from './method_const'

function apiMenuListByAdminId(id) {
  return service({
    url: '/adminApi/console/admin/findMenuListByAdminId',
    method: method.GET,
    params: {id:id}
  })
}

export {
  apiMenuListByAdminId,
}
