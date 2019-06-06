
// 线性数据递归转化为树。
function toTree(data, pid) {
  let tree = [];
  let temp;
  if(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].parentId === pid) {
        let obj = data[i];
        temp = toTree(data, data[i].id);
        if (temp.length > 0) {
          obj.children = temp;
        }
        tree.push(obj);
      }
    }
  }
  return tree;
}


export {
  toTree
}
