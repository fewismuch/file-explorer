import {
  CheckOutlined,
  CloseOutlined,
  DeleteFilled,
  EditFilled,
  FileAddFilled,
  FileFilled,
  FolderAddFilled,
  FolderFilled,
  FolderOpenFilled,
  RightOutlined,
} from '@ant-design/icons'
import React from 'react'

const IconMap = {
  file: <FileFilled />,
  folder: <FolderFilled />,
  addFile: <FileAddFilled />,
  addFolder: <FolderAddFilled />,
  delete: <DeleteFilled />,
  edit: <EditFilled />,
  folderOpen: <FolderOpenFilled />,
  right: <RightOutlined />,
  close: <CloseOutlined />,
  check: <CheckOutlined />,
}

interface IIcon {
  name: keyof typeof IconMap
  style?: {
    color?: string
    fontSize?: string | number
  }
  [key: string]: any
}

const Icon: React.FC<IIcon> = (props) => {
  const { style, name, ...rest } = props
  return (
    <span {...rest} style={{ display: 'flex', alignItems: 'center', ...style }}>
      {IconMap[name]}
    </span>
  )
}

export default Icon
