import service from '@/utils/ajax'
import method from './method_const'

function apiNavList() {
  return service({
    url: '/adminApi/console/admin/navList',
    method: method.GET,
    params: {}
  })
}


export {
  apiNavList
}
