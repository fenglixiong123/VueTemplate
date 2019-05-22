import {Message} from "element-ui";

//请求列表
let requestList = [];

/**
 * @name 阻止短时间内重复请求
 * @param url 当前请求地址
 * @param cancel 中断请求
 * @description 每个请求发起前先判断当前请求是否存在于RequestList中，
 *              如果存在则取消该次请求，如果不存在则加入RequestList中，
 *              当请求完成后500ms时，清除RequestList中对应的该请求。
 */
function addRequest(url,cancel) {
  console.log(`check rate:${url}`);
  for (let i=0;i<requestList.length;i++){
    if(requestList[i] === url){
      console.log("request too much，try again later！");
      cancel(`cancel request : ${url}`);
      Message({
        message: `请求过于频繁，请稍后再试！URL:${url}`,
        type: 'error'
      });
      return;
    }
  }
  console.log(`%c[###]add url to requestList:${url}`,'background:yellow');
  requestList.push(url);
}

/**
 * 从requestList中删除url
 */
function removeRequest(url) {
  for (let i = 0; i < requestList.length; i++) {
    if(requestList[i] === url){
      setTimeout(function () {
        requestList.splice(i,1);
        console.log(`%c[###]remove url from requestList:${url}`,'background:yellow')
      },500);
      break;
    }
  }
}

export {
  addRequest,
  removeRequest
}
