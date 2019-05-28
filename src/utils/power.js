
const adminPower = 'Admin-Power';

function getPowerList() {
  let powerStr = sessionStorage.getItem(adminPower);
  if(powerStr){
    return JSON.parse(powerStr);
  }
  return null;
}

function setPowerList(powerList) {
  if(!powerList){return;}
  let powerStr = JSON.stringify(powerList);
  sessionStorage.setItem(adminPower,powerStr);
}

function removePowerList() {
  sessionStorage.removeItem(adminPower);
}

export {
  getPowerList,
  setPowerList,
  removePowerList
}
