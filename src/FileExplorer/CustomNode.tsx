import { useDragOver } from '@rainetian/react-dnd-treeview/pure'
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
  isOpen?: boolean
  showInput?: boolean
  showActions?: boolean
  onToggle: (id: string | number) => void
  onTextChange: (id: string | number, value: string) => void
  onCreate: (node: INode, draft?: boolean) => void
  onRemove: (id: string | number, draft?: boolean) => void
  onSelect?: (node: INode) => void
  titleRender?: (node: INode) => React.ReactNode
  switcherIcon?: (isOpen: boolean) => React.ReactNode | React.ReactNode
  fileIcon?: (fileSuffix: string) => React.ReactNode
}

export const CustomNode: React.FC<ICustomNode> = (props) => {
  const {
    dragOverAutoExpand,
    clickRowAutoExpand,
    isSelected,
    isOpen = false,
    showActions = true,
    titleRender,
    switcherIcon,
    fileIcon,
  } = props
  const { id, droppable, text } = props.node
  const [visibleInput, setVisibleInput] = useState(false)
  const indent = props.depth * 24
  const [hover, setHover] = useState(false)

  const showInput = visibleInput || text === ''

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    props.onToggle(id)
  }

  const dragOverProps = useDragOver(id, isOpen, props.onToggle)

  const dragOverAutoExpandProps = dragOverAutoExpand ? dragOverProps : {}

  const handleShowInput = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const handleAddNode = (e: React.MouseEvent) => {
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

  const handleAddFolder = (e: React.MouseEvent) => {
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

  const handleSelectNode = (e: React.MouseEvent) => {
    if (clickRowAutoExpand) handleToggle(e)
    props.onSelect?.(props.node)
  }

  const handleRemoveNode = (e: React.MouseEvent) => {
    e.stopPropagation()
    props.onRemove(id)
  }

  const NodeIcon = ({ name }: { name?: string }) => {
    if (typeof fileIcon === 'boolean') return <div style={{ marginLeft: -4 }}></div>
    if (!fileIcon) {
      return (
        <div className='file-explorer__node-icon' data-name={name}>
          {droppable ? <Icon name={isOpen ? 'folderOpen' : 'folder'} /> : <Icon name='file' />}
        </div>
      )
    } else {
      const FolderOpenIcon = fileIcon('folderOpen') || <Icon name='folderOpen' />
      const FolderIcon = fileIcon('folder') || <Icon name='folder' />
      const OtherIcon = fileIcon(name?.split('.').pop() || 'file') || <Icon name='file' />
      return (
        <div className='file-explorer__node-icon' data-name={name}>
          {droppable ? (isOpen ? FolderOpenIcon : FolderIcon) : OtherIcon}
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

  const SwitcherIcon = () => {
    const iconFunc = switcherIcon && typeof switcherIcon === 'function'

    return (
      <div
        className={`file-explorer__node-expand-icon-wrapper ${!droppable ? 'disabled' : ''}`}
        onClick={handleToggle}
      >
        {droppable &&
          (!iconFunc ? (
            <div className={`file-explorer__node-expand-icon ${isOpen ? 'isOpen' : ''}`}>
              {switcherIcon || <Icon name='right' />}
            </div>
          ) : (
            switcherIcon(isOpen)
          ))}
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
      {SwitcherIcon()}
      {NodeIcon({ name: text })}

      <div className='file-explorer__node-content'>
        {showInput ? (
          <Input text={text} onChange={handleSubmit} onCancel={handleCancel} />
        ) : (
          <span className='file-explorer__node-text'>
            {titleRender ? titleRender(props.node) : text}
          </span>
        )}

        {hover && !showInput && showActions && NodeActions()}
      </div>
    </div>
  )
}
