import { useDragOver } from '@minoru/react-dnd-treeview'
import React, { useEffect, useState } from 'react'

import { Icon } from './Icons'
import { Input } from './Input'
import { DRAFT_ID } from './utils'

import type { INode } from './types'

interface ICustomNode {
  node: INode
  depth: number
  isSelected?: boolean
  dragOverAutoExpand?: boolean
  clickRowAutoExpand?: boolean
  onToggle: (id: string | number) => void
  onTextChange: (id: string | number, value: string) => void
  onCreate: (node: INode, draft?: boolean) => void
  onRemove: (id: string | number, draft?: boolean) => void
  onSelect?: (node: INode) => void
  isOpen?: boolean
  showIcon?: boolean
  showActions?: boolean
  showInput?: boolean
  titleRender?: (node: INode) => React.ReactNode
  switcherIcon?: React.ReactNode
}

export const CustomNode: React.FC<ICustomNode> = (props) => {
  const {
    dragOverAutoExpand,
    clickRowAutoExpand,
    isSelected,
    showIcon,
    isOpen = false,
    showActions = true,
    titleRender,
    switcherIcon,
  } = props
  const { id, droppable, text } = props.node
  const [visibleInput, setVisibleInput] = useState(false)
  const indent = props.depth * 24
  const [hover, setHover] = useState(false)

  const showInput = visibleInput || text === ''

  const handleToggle = (e: any) => {
    e.stopPropagation()
    props.onToggle(id)
  }

  const dragOverProps = useDragOver(id, isOpen, props.onToggle)

  const dragOverAutoExpandProps = dragOverAutoExpand ? dragOverProps : {}

  const handleShowInput = (e: any) => {
    e.stopPropagation()
    setVisibleInput(true)
  }

  const handleSubmit = (val: string, create = false) => {
    setVisibleInput(false)
    if (create) {
      props.onTextChange('_draft_id_', val)
      return
    }
    props.onTextChange(id, val)
  }

  const handleCancel = (remove = false) => {
    if (remove) {
      props.onRemove(id, true)
    }
    setVisibleInput(false)
  }

  const handleAddNode = (e: any) => {
    e.stopPropagation()
    props.onCreate(
      {
        id: DRAFT_ID,
        text: '',
        parent: id,
        droppable: false,
      },
      true
    )
  }

  const handleAddFolder = (e: any) => {
    e.stopPropagation()
    props.onCreate(
      {
        id: DRAFT_ID,
        text: '',
        parent: id,
        droppable: true,
      },
      true
    )
  }

  const handleSelectNode = (e: any) => {
    if (clickRowAutoExpand) handleToggle(e)
    props.onSelect?.(props.node)
  }

  const handleRemoveNode = (e: any) => {
    e.stopPropagation()
    props.onRemove(id)
  }

  const NodeIcon = ({ name }: { name?: string }) => {
    if (showIcon) {
      return (
        <div className='file-explorer__node-icon' data-name={name}>
          {droppable ? <Icon name={isOpen ? 'folderOpen' : 'folder'} /> : <Icon name='file' />}
        </div>
      )
    }
  }

  const NodeActions = () => {
    return (
      <div className='file-explorer__node-actions'>
        {droppable ? (
          <>
            <span onClick={handleAddNode}>
              <Icon name='addFile' />
            </span>
            <span onClick={handleAddFolder}>
              <Icon name='addFolder' />
            </span>
          </>
        ) : null}
        <span onClick={handleRemoveNode}>
          <Icon name='delete' />
        </span>
        <span onClick={handleShowInput}>
          <Icon name='edit' />
        </span>
      </div>
    )
  }

  useEffect(() => {
    setVisibleInput(props.showInput || false)
  }, [props.showInput])

  return (
    <div
      className={`file-explorer__node ${hover ? 'file-explorer__node--hover' : ''} ${
        isSelected ? 'file-explorer__node--selected' : ''
      }`}
      style={{ paddingInlineStart: indent }}
      {...dragOverAutoExpandProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleSelectNode}
    >
      <div
        className={`file-explorer__node-expand-icon-wrapper ${!droppable ? 'disabled' : ''}`}
        onClick={handleToggle}
      >
        {droppable && (
          <div className={`file-explorer__node-expand-icon ${isOpen ? 'isOpen' : ''}`}>
            {switcherIcon || <Icon name='right' />}
          </div>
        )}
      </div>
      <NodeIcon name={text} />

      <div className='file-explorer__node-content'>
        {showInput ? (
          <Input text={text} onChange={handleSubmit} onCancel={handleCancel} />
        ) : (
          <span className='file-explorer__node-text'>
            {titleRender ? titleRender(props.node) : text}
          </span>
        )}

        {hover && !showInput && showActions && <NodeActions />}
      </div>
    </div>
  )
}
