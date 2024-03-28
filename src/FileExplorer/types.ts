import {
  CloseHandler,
  DropOptions,
  NodeModel,
  OpenHandler,
  TreeProps,
} from '@rainetian/react-dnd-treeview/pure'
import React from 'react'

export interface FileMap {
  [filePath: string]: string | Record<string, any>
}

export interface INode {
  id: number | string
  parent: number | string
  text: string
  droppable?: boolean

  // 其他属性
  [propName: string]: any
}

export interface IFileExplorerMethods {
  getFiles(): FileMap
  getData(): INode[]
  addFile(): void

  addFolder(): void

  /**
   * 删除节点
   * @param id
   * @param draft 是否是草稿态（草稿态为假删除）
   */
  remove(id: string | number, draft?: boolean): void

  edit(id: string | number): void

  open: OpenHandler
  close: CloseHandler

  openAll(): void

  closeAll(): void
}

export interface ICustomNode {
  node: INode
  depth: number
  isSelected?: boolean
  dragOverAutoExpand?: boolean
  clickRowAutoExpand?: boolean
  isOpen?: boolean
  showInput?: boolean
  showActions?: boolean
  onToggle: (id: string | number) => void
  onTextChange: (id: string | number, value: string) => void
  onCreate: (node: INode, draft?: boolean) => void
  onRemove: (id: string | number, draft?: boolean) => void
  onSelect?: (node: INode) => void
  onCancelInput?: () => void
  titleRender?: (node: INode) => React.ReactNode
  actions?: (node: INode) => React.ReactNode
  switcherIcon?: ((isOpen: boolean) => React.ReactNode) | React.ReactNode
  fileIcon?: ((fileSuffix: string) => React.ReactNode) | boolean
}

export interface IFileExplorerChangeParams {
  action: 'create' | 'update' | 'remove' | 'drop'
  oldTree: INode[]
  oldNode?: INode
  newNode?: INode
}

type omitTreeProps = 'tree' | 'sort' | 'render' | 'onDrop'
export interface IFileExplorer extends Omit<TreeProps, omitTreeProps> {
  fileExplorerRef?: React.ForwardedRef<IFileExplorerMethods>
  theme?: 'dark' | 'light'
  data: INode[]
  // 变更事件
  onChange?: (newTree: INode[], changeParams: IFileExplorerChangeParams) => void
  // 选中事件
  onSelect?: (node: INode) => void
  // 拖拽事件
  onDrop?: (tree: NodeModel[], options: DropOptions) => void
  // 拖拽到文件夹上是否自动展开
  dragOverAutoExpand?: boolean
  // 点击行时是否自动展开
  clickRowAutoExpand?: boolean
  // 是否允许选中
  enableSelect?: boolean
  // 是否展示操作按钮
  showActions?: boolean
  // 自定义标题渲染
  titleRender?: (node: INode) => React.ReactNode
  // 自定义折叠图标
  switcherIcon?: ((isOpen: boolean) => React.ReactNode) | React.ReactNode
  // 自定义图标/是否显示图标
  fileIcon?: ((fileSuffix: 'file' | 'folder' | 'folderOpen' | string) => React.ReactNode) | boolean
  // 选中的ID
  selectedId?: string | number | null
  // 是否允许重复名称
  allowRepeatText?: boolean
  // 是否运行排序
  enableSort?: boolean
  actions?: (node: INode) => React.ReactNode
}
