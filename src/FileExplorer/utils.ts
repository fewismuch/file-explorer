import type {INode} from "./types";

export const getLastId = (treeData: INode[]) => {
  const reversedArray = [...treeData].sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  if (reversedArray.length > 0) {
    return reversedArray[0].id;
  }

  return 0;
};


export const findChangedNode = (currentArray: INode[], newArray: INode[]) => {
  let node;
  currentArray.forEach(item => {
    const nItem = newArray.find(n => n.id === item.id)
    if (item.pid !== nItem?.pid) {
      node = item
      return
    }
  })
  return node
}

export const DRAFT_ID = '_draft_id_'
