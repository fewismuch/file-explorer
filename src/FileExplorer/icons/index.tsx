import React from 'react'
import {ReactComponent as File} from './file.svg'
import {ReactComponent as Folder} from './folder.svg'
import {ReactComponent as AddFile} from './add-file.svg'
import {ReactComponent as AddFolder} from './add-folder.svg'
import {ReactComponent as Delete} from './delete.svg'
import {ReactComponent as Edit} from './edit.svg'
import {ReactComponent as FolderOpen} from './folder-open.svg'
import {ReactComponent as Right} from './right.svg'
import {ReactComponent as Close} from './close.svg'
import {ReactComponent as Check} from './check.svg'

const IconMap = {
  file: <File/>,
  folder: <Folder/>,
  addFile: <AddFile/>,
  addFolder: <AddFolder/>,
  delete: <Delete/>,
  edit: <Edit/>,
  folderOpen: <FolderOpen/>,
  right: <Right/>,
  close: <Close/>,
  check: <Check/>
}

interface IIcon {
  name: keyof typeof IconMap
  style?: {
    color?: string;
    fontSize?: string | number
  }

  // 其他
  [key: string]: any
}

const Icon: React.FC<IIcon> = (props) => {
  const {style, name, ...rest} = props
  return <span {...rest} style={{display: 'flex', alignItems: 'center', ...style}}>{IconMap[name]}</span>
}

export default Icon
