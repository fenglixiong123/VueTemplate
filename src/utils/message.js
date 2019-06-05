import {Message,Notification} from "element-ui";

function alertMsg(msg) {
  Message({
    message: msg,
    type: 'success',
    duration: 3000
  })
}

function alertSuccessMsg(msg) {
  Message({
    message: msg,
    type: 'success',
    duration: 3000
  })
}


function alertErrorMsg(msg) {
  Message({
    message: msg,
    type: 'error',
    duration: 3000,
    center: false
  })
}

function notifySuccess(msg) {
  Notification({
    title:'成功',
    message:msg,
    type:"success",
    duration: 5000
  })
}

function notifyError(msg) {
  Notification({
    title:'错误',
    message:msg,
    type:"error",
    duration: 5000
  })
}

export {
  alertMsg,
  alertErrorMsg,
  alertSuccessMsg,
  notifyError,
  notifySuccess
}
