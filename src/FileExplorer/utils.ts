import type { FileMap, INode } from './types'

/**
 * 生成一个UUID字符串（去除连字符的版本）
 * @returns 生成的UUID字符串
 */
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
    .replace(/-/g, '')
}

/**
 * 查找在两个节点数组中父级发生变化的节点
 * @param currentArray 当前节点数组
 * @param newArray 新节点数组
 * @returns 发生变化的节点，如果没有则返回undefined
 */
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

/**
 * 将扁平的文件映射转换为树形结构
 * @param files 文件映射对象，键为文件路径，值为文件内容
 * @param rootId 根节点ID，默认为0
 * @returns 树形结构节点数组
 */
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
      // @ts-ignore
      droppable: files[filePath]?.code === '//#folder#//',
      text: fileName,
      content: files[filePath],
    })
  }

  return tree
}

/**
 * 将树形结构转换回扁平的文件映射
 * @param tree 树形结构节点数组
 * @param rootId 根节点ID，默认为0
 * @returns 文件映射对象
 */
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

// 特殊后缀 Icons8 图标名称映射
const SPECIAL_EXT_ICON_MAP: Record<string, string> = {
  md: 'markdown',
  js: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  jsx: 'javascript',
  css: 'css3',
  html: 'html-5',
  jpeg: 'jpg',
  docx: 'doc',
  xlsx: 'xls',
  pptx: 'ppt',
  mp4: 'video',
  webp: 'image',
  vue: 'file',
}

// Icons8 支持的
const VALID_ICON_EXTS = [
  // 文档类
  'txt',
  'json',
  'xml',
  'csv',
  // 代码类
  'vue',
  // 媒体类
  'png',
  'jpg',
  'jpeg',
  'gif',
  'mp3',
  'avi',
  // 办公类
  'pdf',
  // 压缩包
  'zip',
  'rar',
]

/**
 * 生成 Icons8 图标 URL
 */
export const getFileIcon8Url = (
  ext: string,
  { style = 'color', size = 48, color = '000000' } = {}
) => {
  if (!ext || (!SPECIAL_EXT_ICON_MAP[ext] && !VALID_ICON_EXTS.includes(ext))) return ''
  const iconName = SPECIAL_EXT_ICON_MAP[ext] || ext
  return `https://img.icons8.com/${style}/${size}/${color}/${iconName}.png`
}
