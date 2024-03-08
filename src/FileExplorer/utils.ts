import type { FileMap, INode } from './types'

export const getLastId = (treeData: INode[]) => {
  const reversedArray = [...treeData].sort((a, b) => {
    if (a.id < b.id) {
      return 1
    } else if (a.id > b.id) {
      return -1
    }

    return 0
  })

  if (reversedArray.length > 0) {
    return reversedArray[0].id
  }

  return 0
}

export const findChangedNode = (currentArray: INode[], newArray: INode[]) => {
  let node
  currentArray.forEach((item) => {
    const nItem = newArray.find((n) => n.id === item.id)
    if (item.pid !== nItem?.pid) {
      node = item
      return null
    }
  })
  return node
}

export function files2tree(files: FileMap): INode[] {
  const tree: INode[] = []
  const folders: { [folderPath: string]: number } = {}

  // 构建文件夹路径映射
  for (const filePath in files) {
    const parts = filePath.startsWith('/') ? filePath.slice(1).split('/') : filePath.split('/')
    let parent = 0
    for (let i = 0; i < parts.length - 1; i++) {
      const folderPath = parts.slice(0, i + 1).join('/')
      if (!folders[folderPath]) {
        const folderId = tree.length + 1
        folders[folderPath] = folderId
        tree.push({
          id: folderId,
          parent,
          droppable: true,
          text: parts[i],
        })
      }
      parent = folders[folderPath]
    }

    // 处理文件
    const fileName = parts.pop()!
    const fileId = tree.length + 1
    tree.push({
      id: fileId,
      parent,
      droppable: false,
      text: fileName,
      content: files[filePath],
    })
  }

  return tree
}

export function tree2files(tree: INode[]): FileMap {
  const files: FileMap = {}

  // 构建文件路径和对应的值映射
  tree.forEach((item) => {
    if (!item.droppable) {
      let filePath = ''
      let parentId = item.parent

      // 递归查找父级文件夹
      while (parentId !== 0) {
        const parentItem = tree.find((folder) => folder.id === parentId)!
        filePath = parentItem.text + '/' + filePath
        parentId = parentItem.parent
      }

      // 如果文件路径为空，说明是根目录下的文件
      if (filePath === '') {
        filePath = item.text
      } else {
        filePath += item.text
      }

      files[filePath] = item.content!
    }
  })

  return files
}

export function findNodeIdByPath(tree: INode[], path: string): number | string | null {
  let currentId: number | string = 0
  const parts = path.split('/').filter((part) => part) // 分割路径并过滤掉空字符串

  for (const part of parts) {
    // 查找当前路径下是否有子节点
    let found = false
    for (const node of tree) {
      if (node.parent === currentId && node.text === part) {
        currentId = node.id
        found = true
        break
      }
    }
    if (!found) {
      // 如果当前部分的路径没有找到对应的节点，返回null
      return null
    }
  }

  // 如果遍历完所有路径部分，返回最后一个匹配的节点ID
  return currentId
}

export const DRAFT_ID = '_draft_id_'
