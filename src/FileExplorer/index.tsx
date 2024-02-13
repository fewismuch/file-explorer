import React, {useEffect, useState} from 'react';
import {DndProvider, getBackendOptions, getDescendants, MultiBackend, Tree} from "@minoru/react-dnd-treeview";
import {CustomNode} from "./CustomNode";
import {DRAFT_ID, findChangedNode} from "./utils";
import './index.less'
import type {IFileExplorer, INode} from "./types";

const FileExplorer: React.FC<IFileExplorer> = (props) => {
  const {
    fileExplorerRef,
    data,
    onChange,
    onSelect,
    canDrag,
    enableAnimateExpand = true,
    dragOverAutoExpand = false,
    clickRowAutoExpand = true,
    enableSelect = true,
    showIcon = true,
    showActions = false,
    enableDrag = false,
    initialOpen = false,
    rootId = '',
    titleRender,
    switcherIcon
  } = props
  const [fileExplorerData, setFileExplorerData] = useState(data)
  const [selectedNode, setSelectedNode] = useState<INode | undefined>();

  const handleDrop = (newTree: INode[]) => {
    const targetNode = findChangedNode(data, newTree)
    onChange?.(newTree, [...data], 'drop', targetNode)
  }

  const handleRemove = (id: string | number, draft?: boolean) => {
    const removeIds = [
      id,
      ...getDescendants(data, id).map((node) => node.id)
    ];
    const newTree = data.filter((node) => !removeIds.includes(node.id));
    if (draft) {
      setFileExplorerData(newTree)
      return
    }
    onChange?.(newTree, [...data], 'remove', data.find(node => node.id === id))
  };


  const handleCreate = (node: INode, draft?: boolean) => {
    const newTree = [
      ...data,
      node
    ]
    if (draft) {
      setFileExplorerData(newTree)
      return
    }
    onChange?.(newTree, [...data], 'create', node)
  };


  const handleTextChange = (id: string | number, value: string) => {
    if (id === DRAFT_ID) {
      const draftNode = fileExplorerData.find(node => node.id === id)!
      handleCreate({
        ...draftNode,
        id: '',
        text: value
      })
      return
    }
    let targetNode;
    const newTree = data.map((node) => {
      if (node.id === id) {
        targetNode = node
        return {
          ...node,
          text: value
        };
      }

      return node;
    });
    onChange?.(newTree, [...data], 'update', targetNode)
  };

  const handleSelect = (node: INode) => {
    if (enableSelect) {
      setSelectedNode(node)
      onSelect?.(node)
    }
  }

  useEffect(() => {
    if (fileExplorerRef) {
      fileExplorerRef.addFile = () => handleCreate({
        id: DRAFT_ID,
        text: '',
        parent: rootId,
        droppable: false,
      }, true)

      fileExplorerRef.addFolder = () => handleCreate({
        id: DRAFT_ID,
        text: '',
        parent: rootId,
        droppable: true,
      }, true)
    }
  }, [])

  useEffect(() => {
    setFileExplorerData(data)
  }, [data])

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={fileExplorerData}
        rootId={rootId}
        enableAnimateExpand={enableAnimateExpand}
        render={(node, {depth, isOpen, onToggle}) => (
          <CustomNode
            node={node}
            depth={depth}
            isOpen={isOpen}
            showIcon={showIcon}
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
          />
        )}
        onDrop={handleDrop}
        classes={{
          root: 'file-explorer',
          draggingSource: 'file-explorer__draggingSource',
          dropTarget: 'file-explorer__dropTarget'
        }}
        canDrag={canDrag ? canDrag : () => enableDrag}
        initialOpen={initialOpen}
      />
    </DndProvider>
  )
}

export default FileExplorer;
