
export function clearObj(obj) {
  Object.keys(obj).forEach(key=>{
    let o = obj[key];
    if(o instanceof Object){
      clearObj(obj[key]);
    }else if(o instanceof Array){
      obj[key] = [];
    }else {
      obj[key] = null;
    }
  })
}
