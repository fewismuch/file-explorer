import { TreeProps } from '@rainetian/react-dnd-treeview/pure'
import React from 'react'

export interface IFileExplorerMethods {
  addFile: () => void
  addFolder: () => void
  remove: (id: string | number) => void
  edit: (id: string | number) => void
}

export interface INode {
  id: number | string
  parent: number | string
  text: string
  droppable?: boolean

  // 其他属性
  [propName: string]: any
}

export type ChangeAction = 'create' | 'update' | 'remove' | 'drop'

export interface IFileExplorer extends Omit<TreeProps, 'tree' | 'render'> {
  fileExplorerRef?: React.ForwardedRef<IFileExplorerMethods>
  data: INode[]
  onChange?: (newTree: INode[], oldTree: INode[], action: ChangeAction, targetNode?: INode) => void
  onSelect?: (node: INode) => void
  dragOverAutoExpand?: boolean
  clickRowAutoExpand?: boolean
  enableSelect?: boolean
  showActions?: boolean
  titleRender?: (node: INode) => React.ReactNode
  switcherIcon?: (isOpen: boolean) => React.ReactNode
  fileIcon?: (fileSuffix: string) => React.ReactNode
}
