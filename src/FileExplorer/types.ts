import {
  CloseHandler,
  DropOptions,
  NodeModel,
  OpenHandler,
  TreeProps,
} from '@rainetian/react-dnd-treeview/pure'
import React from 'react'

export interface IFileExplorerMethods {
  getFiles(): void
  addFile(): void

  addFolder(): void

  remove(id: string | number): void

  edit(id: string | number): void

  open: OpenHandler
  close: CloseHandler

  openAll(): void

  closeAll(): void
}

export interface INode {
  id: number | string
  parent: number | string
  text: string
  droppable?: boolean

  // 其他属性
  [propName: string]: any
}

export interface IFileExplorerChangeParams {
  action: 'create' | 'update' | 'remove' | 'drop'
  oldTree: INode[]
  oldNode?: INode
  newNode?: INode
}

export interface IFileExplorer extends Omit<TreeProps, 'tree' | 'render' | 'onDrop'> {
  fileExplorerRef?: React.ForwardedRef<IFileExplorerMethods>
  theme?: 'dark' | 'light'
  data: INode[]
  // 变更事件
  onChange?: (newTree: INode[], changeParams: IFileExplorerChangeParams) => void
  // 选中事件
  onSelect?: (node: INode) => void
  // 拖拽事件
  onDrop?: (tree: NodeModel[], options: DropOptions) => void
  // 拖拽时是否自动展开
  dragOverAutoExpand?: boolean
  // 点击行时是否自动展开
  clickRowAutoExpand?: boolean
  // 是否运行选择
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
}

export interface FileMap {
  [filePath: string]: string | Record<string, any>
}
