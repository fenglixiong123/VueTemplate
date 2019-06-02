
const writeList = [
  '/login',
  '/getToken',
  '/error/401',
  '/error/403',
  '/error/404',
  '/error/500',
  'https://api.github.com/users'
];

function isWrite(url) {
  for (let i = 0; i < writeList.length; i++) {
    if(writeList.includes(url)){
      console.log("白名单检验通过：",url);
      return true;
    }
  }
  return false;
}

export {
  isWrite
}
