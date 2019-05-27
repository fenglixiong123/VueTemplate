import {Message} from "element-ui";

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

export {
  alertMsg,
  alertErrorMsg,
  alertSuccessMsg
}
