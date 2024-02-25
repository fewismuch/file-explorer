import {
  DndProvider,
  HTML5Backend,
  Tree,
  TreeMethods,
  getDescendants,
} from '@rainetian/react-dnd-treeview/pure'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'

import { CustomNode } from './CustomNode'
import './index.less'
import { DRAFT_ID, findChangedNode } from './utils'

import type { IFileExplorer, INode } from './types'

export const FileExplorer: React.FC<IFileExplorer> = (props) => {
  const treeRef = useRef<TreeMethods>(null)
  const {
    fileExplorerRef,
    rootId,
    data,
    onChange,
    onSelect,
    dragOverAutoExpand = false,
    clickRowAutoExpand = true,
    enableSelect = true,
    showActions = false,
    titleRender,
    switcherIcon,
    fileIcon,
    ...rest
  } = props
  const [fileExplorerData, setFileExplorerData] = useState(data)
  const [selectedNode, setSelectedNode] = useState<INode | undefined>()
  const [editingNodeId, setEditingNodeId] = useState<string | number | null>(null)

  const handleDrop = (newTree: INode[]) => {
    const targetNode = findChangedNode(data, newTree)
    onChange?.(newTree, [...data], 'drop', targetNode)
  }

  const handleRemove = (id: string | number, draft?: boolean) => {
    const removeIds = [id, ...getDescendants(data, id).map((node) => node.id)]
    const newTree = data.filter((node) => !removeIds.includes(node.id))
    if (draft) {
      setFileExplorerData(newTree)
      return
    }
    onChange?.(
      newTree,
      [...data],
      'remove',
      data.find((node) => node.id === id)
    )
  }

  const handleCreate = (node: INode, draft?: boolean) => {
    const newTree = [...data, node]
    if (draft) {
      setFileExplorerData(newTree)
      return
    }
    onChange?.(newTree, [...data], 'create', node)
  }

  const handleTextChange = (id: string | number, value: string) => {
    if (id === DRAFT_ID) {
      const draftNode = fileExplorerData.find((node) => node.id === id)!
      handleCreate({
        ...draftNode,
        id: '',
        text: value,
      })
      return
    }
    let targetNode
    const newTree = data.map((node) => {
      if (node.id === id) {
        targetNode = node
        return {
          ...node,
          text: value,
        }
      }

      return node
    })
    onChange?.(newTree, [...data], 'update', targetNode)
  }

  const handleSelect = (node: INode) => {
    if (enableSelect) {
      setSelectedNode(node)
      onSelect?.(node)
    }
  }

  useImperativeHandle(fileExplorerRef, () => ({
    addFile: () =>
      handleCreate(
        {
          id: DRAFT_ID,
          text: '',
          parent: rootId,
          droppable: false,
        },
        true
      ),
    addFolder: () =>
      handleCreate(
        {
          id: DRAFT_ID,
          text: '',
          parent: rootId,
          droppable: true,
        },
        true
      ),
    remove: (id: string | number) => handleRemove(id, true),
    edit: (id: string | number) => {
      setEditingNodeId(id)
    },
    ...treeRef.current,
  }))

  useEffect(() => {
    setFileExplorerData(data)
  }, [data])

  return (
    <DndProvider backend={HTML5Backend}>
      <Tree
        ref={treeRef}
        tree={fileExplorerData}
        rootId={rootId}
        render={(node, { depth, isOpen, onToggle }) => (
          <CustomNode
            node={node}
            depth={depth}
            isOpen={isOpen}
            switcherIcon={switcherIcon}
            isSelected={node.id === selectedNode?.id}
            onToggle={onToggle}
            onSelect={handleSelect}
            onRemove={handleRemove}
            onTextChange={handleTextChange}
            onCreate={handleCreate}
            dragOverAutoExpand={dragOverAutoExpand}
            clickRowAutoExpand={clickRowAutoExpand}
            titleRender={titleRender}
            showActions={showActions}
            showInput={node.id === editingNodeId}
            fileIcon={fileIcon}
          />
        )}
        onDrop={handleDrop}
        classes={{
          root: 'file-explorer',
          draggingSource: 'file-explorer__draggingSource',
          dropTarget: 'file-explorer__dropTarget',
        }}
        {...rest}
      />
    </DndProvider>
  )
}
