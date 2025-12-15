import {
  CloseHandler,
  DndProvider,
  DropOptions,
  HTML5Backend,
  OpenHandler,
  Tree,
  TreeMethods,
  getDescendants,
} from '@rainetian/react-dnd-treeview/pure'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'

import { CustomNode } from './CustomNode'
import { Placeholder } from './Placeholder'
import { IFileExplorer, INode } from './types'
import { DRAFT_ID, findChangedNode, generateUUID, tree2files } from './utils'

import './index.less'

export const FileExplorer: React.FC<IFileExplorer> = (props) => {
  const treeRef = useRef<TreeMethods>(null)
  const {
    fileExplorerRef,
    rootId = 0,
    data,
    onDrop,
    onChange,
    onSelect,
    dragOverAutoExpand = false,
    clickRowAutoExpand = true,
    enableSelect = true,
    enableSort = true,
    showActions = false,
    allowRepeatText = true,
    titleRender,
    actions,
    switcherIcon,
    fileIcon,
    theme,
    selectedId,
    ...rest
  } = props
  const [fileExplorerData, setFileExplorerData] = useState(data)
  const [selectedNode, setSelectedNode] = useState<INode | undefined>()
  const [editingNodeId, setEditingNodeId] = useState<string | number | null>(null)

  const handleDrop = (newTree: INode[], options: DropOptions) => {
    onDrop?.(newTree, options)
    const oldNode = findChangedNode(data, newTree)!
    const newNode = findChangedNode(newTree, data)!

    if (!allowRepeatText) {
      // 不允许重复且没有新节点 = 同级目录内排序
      if (!newNode) {
        onChange?.(newTree, {
          action: 'sort',
          oldTree: [...data],
          oldNode,
        })
        return
      }
      const existNode = data.find(
        (n) =>
          n.parent === newNode?.parent &&
          n.text === oldNode.text &&
          n.droppable === oldNode.droppable
      )
      if (existNode) return
    }

    onChange?.(newTree, {
      action: 'drop',
      oldTree: [...data],
      oldNode,
      newNode,
    })
  }

  const handleRemove = (id: string | number, draft?: boolean) => {
    const removeIds = [id, ...getDescendants(data, id).map((node) => node.id)]
    const newTree = data.filter((node) => !removeIds.includes(node.id))
    if (draft) {
      setFileExplorerData(newTree)
      return
    }
    const oldNode = data.find((node) => node.id === id)!
    onChange?.(newTree, {
      action: 'remove',
      oldTree: [...data],
      oldNode,
    })
  }

  const handleCreate = (node: INode, draft?: boolean) => {
    treeRef.current?.open(node.parent)
    let newTree = [...data, node]
    if (draft) {
      setFileExplorerData(newTree)
      return
    }

    if (!allowRepeatText) {
      const existNode = data.find(
        (n) => n.parent === node.parent && n.text === node.text && n.droppable === node.droppable
      )
      if (existNode) {
        handleRemove(node.id, true)
        return
      }
    }

    const newNode = {
      ...node,
      id: generateUUID(),
    }
    newTree = [...data, newNode]
    onChange?.(newTree, {
      action: 'create',
      oldTree: [...data],
      newNode,
    })
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

    if (!allowRepeatText) {
      const node = data.find((node) => node.id === id)!
      const existNode = data.find(
        (n) => n.parent === node.parent && n.text === value && n.droppable === node.droppable
      )
      if (existNode) return
    }

    let oldNode
    let newNode
    const newTree = data.map((node) => {
      if (node.id === id) {
        oldNode = node
        newNode = {
          ...node,
          text: value,
        }
        return newNode
      }
      return node
    })

    onChange?.(newTree, {
      action: 'update',
      oldTree: [...data],
      oldNode: oldNode!,
      newNode,
    })
  }

  const handleSelect = (node: INode) => {
    if (enableSelect) {
      setSelectedNode(node)
      onSelect?.(node)
    }
  }

  const handleCancelInput = () => {
    setEditingNodeId(null)
  }

  useImperativeHandle(fileExplorerRef, () => ({
    addFile: (parent?: string | number) =>
      handleCreate(
        {
          id: DRAFT_ID,
          text: '',
          parent: parent ?? rootId,
          droppable: false,
        },
        true
      ),
    addFolder: (parent?: string | number) =>
      handleCreate(
        {
          id: DRAFT_ID,
          text: '',
          parent: parent ?? rootId,
          droppable: true,
        },
        true
      ),
    remove: (id: string | number, draft = true) => handleRemove(id, draft),
    edit: (id: string | number) => {
      setEditingNodeId(id)
    },
    getFiles: (rootId = 0) => tree2files(fileExplorerData, rootId),
    getData: () => fileExplorerData,
    openAll: () => treeRef.current?.openAll(),
    closeAll: () => treeRef.current?.closeAll(),
    open: treeRef.current?.open as OpenHandler,
    close: treeRef.current?.close as CloseHandler,
  }))

  useEffect(() => {
    setFileExplorerData(data)
  }, [data])

  useEffect(() => {
    if (data && selectedId !== undefined) {
      const node = data.find((node) => node.id === selectedId)
      if (node && enableSelect) {
        setSelectedNode(node)
      }
    }
  }, [selectedId])

  return (
    <div data-id='file-explorer' data-theme={theme}>
      <DndProvider backend={HTML5Backend} context={window}>
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
              onCancelInput={handleCancelInput}
              dragOverAutoExpand={dragOverAutoExpand}
              clickRowAutoExpand={clickRowAutoExpand}
              titleRender={titleRender}
              showActions={showActions}
              showInput={node.id === editingNodeId}
              actions={actions}
              fileIcon={fileIcon}
            />
          )}
          onDrop={handleDrop}
          classes={{
            root: 'file-explorer',
            draggingSource: enableSort ? 'file-explorer__draggingSource' : '',
            dropTarget: enableSort ? 'file-explorer__dropTarget' : '',
            placeholder: enableSort ? '' : 'file-explorer__placeholderContainer',
          }}
          {...(enableSort
            ? undefined
            : {
                sort: enableSort,
                insertDroppableFirst: false,
                dropTargetOffset: 5,
                placeholderRender: (node, { depth }) => <Placeholder depth={depth} />,
                canDrop: (tree, { dragSource, dropTargetId }) => {
                  if (dragSource?.parent === dropTargetId) {
                    return true
                  }
                },
              })}
          {...rest}
        />
      </DndProvider>
    </div>
  )
}
