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
  data: INode[]
  onChange?: (newTree: INode[], changeParams: IFileExplorerChangeParams) => void
  onSelect?: (node: INode) => void
  dragOverAutoExpand?: boolean
  clickRowAutoExpand?: boolean
  enableSelect?: boolean
  showActions?: boolean
  theme?: 'dark' | 'light'
  titleRender?: (node: INode) => React.ReactNode
  switcherIcon?: ((isOpen: boolean) => React.ReactNode) | React.ReactNode
  fileIcon?: ((fileSuffix: 'file' | 'folder' | 'folderOpen' | string) => React.ReactNode) | boolean
  onDrop?: (tree: NodeModel[], options: DropOptions) => void
  selectedId?: string | number | null
}

export interface FileMap {
  [filePath: string]: string | Record<string, any>
}
