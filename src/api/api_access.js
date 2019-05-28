import service from '@/utils/ajax'
import method from './method_const'

function apiPowerListByAdminId(id) {
  return service({
    url: '/adminApi/console/admin/findPowerByAdminId',
    method: method.GET,
    params: {id:id}
  })
}


export {
  apiPowerListByAdminId
}
