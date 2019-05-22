
import {Message} from "element-ui";

/**
 * 弹出错误警告
 * @param code
 */
function alertErrorMessage(code) {
  Message({
    message: `服务器错误！错误代码：${code}`,
    type: 'error',
    duration: 2 * 1000
  })
}

export {
  alertErrorMessage
}
