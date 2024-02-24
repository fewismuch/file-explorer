import React from 'react'

export interface IFileExplorerRef {
  addFile: () => void
  addFolder: () => void
  remove: (id: string | number) => void
  edit: (id: string | number) => void
}

export interface INode {
  id: number | string
  parent: number | string
  text: string
  /**
   * 是否可拖拽节点放置到此节点
   */
  droppable?: boolean

  // 其他属性
  [propName: string]: any
}

export type ChangeAction = 'create' | 'update' | 'remove' | 'drop'

export interface IFileExplorer {
  fileExplorerRef?: IFileExplorerRef
  /**
   * parent id of the root node,default ''
   */
  rootId: number | string
  data: INode[]
  titleRender?: (node: INode) => React.ReactNode
  switcherIcon?: React.ReactNode
  onChange?: (newTree: INode[], oldTree: INode[], action: ChangeAction, targetNode?: INode) => void
  onSelect?: (node: INode) => void
  canDrag?: (node?: INode) => boolean
  /**
   * Enable or disable the animation when expanding or collapsing a node
   */
  enableAnimateExpand?: boolean
  /**
   * Enable or disable auto expand when dragging over a node
   */
  dragOverAutoExpand?: boolean
  /**
   * Enable or disable auto expand when clicking on a node
   */
  clickRowAutoExpand?: boolean
  enableSelect?: boolean
  showIcon?: boolean
  showActions?: boolean
  enableDrag?: boolean
  initialOpen?: boolean
}
