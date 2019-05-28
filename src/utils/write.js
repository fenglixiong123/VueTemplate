
const writeList = [
  '/login',
  '/getToken',
  '/401',
  '/403',
  '/404',
  '/500',
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
