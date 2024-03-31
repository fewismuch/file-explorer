import type { FileMap, INode } from './types'

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
    .replace(/-/g, '')
}

export const findChangedNode = (currentArray: INode[], newArray: INode[]) => {
  let node: INode | undefined
  currentArray.forEach((item) => {
    const nItem = newArray.find((n) => n.id === item.id)
    if (item.parent !== nItem?.parent) {
      node = item
      return null
    }
  })
  return node
}

export function files2tree(files: FileMap, rootId: number | string = 0): INode[] {
  const tree: INode[] = []
  const folders: { [folderPath: string]: number } = {}

  // 构建文件夹路径映射
  for (const filePath in files) {
    const parts = filePath.startsWith('/') ? filePath.slice(1).split('/') : filePath.split('/')
    let parent = rootId
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

export function tree2files(tree: INode[], rootId: number | string = 0): FileMap {
  const files: FileMap = {}

  // 构建文件路径和对应的值映射
  tree.forEach((item) => {
    if (!item.droppable) {
      let filePath = ''
      let parentId = item.parent

      // 递归查找父级文件夹
      while (parentId !== rootId) {
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

export const DRAFT_ID = '_draft_id_'
