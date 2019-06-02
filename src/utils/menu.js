
const adminMenuList = 'Admin-Menu-list';
const adminMenuTree = 'Admin-Menu-tree';

function getMenuList() {
  let menuListStr = sessionStorage.getItem(adminMenuList);
  if(menuListStr){
    return JSON.parse(menuListStr);
  }
  return null;
}

function getMenuTree() {
  let menuTreeStr = sessionStorage.getItem(adminMenuTree);
  if(menuTreeStr){
    return JSON.parse(menuTreeStr);
  }
  return null;
}

function setMenuList(menuList) {
  if(!menuList){return;}
  let menuArrayStr = JSON.stringify(menuList);
  sessionStorage.setItem(adminMenuList,menuArrayStr);
}

function setMenuTree(menuTree) {
  if(!menuTree){return;}
  let menuTreeStr = JSON.stringify(menuTree);
  sessionStorage.setItem(adminMenuTree,menuTreeStr);
}

function removeMenu() {
  sessionStorage.removeItem(adminMenuList);
  sessionStorage.removeItem(adminMenuTree);
}

export {
  getMenuList,
  getMenuTree,
  setMenuList,
  setMenuTree,
  removeMenu
}
