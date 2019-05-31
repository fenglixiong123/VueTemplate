import {toTree} from './tree'

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
  let menuTreeStr = JSON.stringify(toTree(menuList,0));
  sessionStorage.setItem(adminMenuList,menuArrayStr);
  sessionStorage.setItem(adminMenuTree,menuTreeStr);
}

function removeMenuList() {
  sessionStorage.removeItem(adminMenuList);
  sessionStorage.removeItem(adminMenuTree);
}

export {
  getMenuList,
  getMenuTree,
  setMenuList,
  removeMenuList
}
