import React from 'react'

export const AddFileIcon = () => (
  <svg
    viewBox='64 64 896 896'
    focusable='false'
    data-icon='file-text'
    width='1em'
    height='1em'
    fill='currentColor'
    aria-hidden='true'
  >
    <path
      fill='currentColor'
      d='M832 384H576V128H192v768h640zm-26.496-64L640 154.496V320zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32m320 512V448h64v128h128v64H544v128h-64V640H352v-64z'
    ></path>
  </svg>
)

export const AddFolderIcon = () => (
  <svg
    viewBox='64 64 896 896'
    focusable='false'
    data-icon='file-text'
    width='1em'
    height='1em'
    fill='currentColor'
    aria-hidden='true'
  >
    <path
      fill='currentColor'
      d='M128 192v640h768V320H485.76L357.504 192zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32m384 416V416h64v128h128v64H544v128h-64V608H352v-64z'
    ></path>
  </svg>
)

export const DeleteIcon = () => (
  <svg
    viewBox='64 64 896 896'
    focusable='false'
    data-icon='delete'
    width='1em'
    height='1em'
    fill='currentColor'
    aria-hidden='true'
  >
    <path
      fill='currentColor'
      d='M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32'
    ></path>
  </svg>
)

export const EditIcon = () => (
  <svg
    viewBox='64 64 896 896'
    focusable='false'
    data-icon='edit'
    width='1em'
    height='1em'
    fill='currentColor'
    aria-hidden='true'
  >
    <path
      fill='currentColor'
      d='m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336zm384 254.272v-64h448v64h-448z'
    ></path>
  </svg>
)

export const FolderOpenIcon = () => (
  <svg
    viewBox='64 64 896 896'
    focusable='false'
    data-icon='file-text'
    width='1em'
    height='1em'
    fill='currentColor'
    aria-hidden='true'
  >
    <path
      fill='currentColor'
      d='M878.08 448H241.92l-96 384h636.16l96-384zM832 384v-64H485.76L357.504 192H128v448l57.92-231.744A32 32 0 0 1 216.96 384zm-24.96 512H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h287.872l128.384 128H864a32 32 0 0 1 32 32v96h23.04a32 32 0 0 1 31.04 39.744l-112 448A32 32 0 0 1 807.04 896'
    ></path>
  </svg>
)

export const RightIcon = () => (
  <svg
    viewBox='64 64 896 896'
    focusable='false'
    data-icon='right'
    width='1em'
    height='1em'
    fill='currentColor'
    aria-hidden='true'
  >
    <path
      fill='currentColor'
      d='M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z'
    ></path>
  </svg>
)

export const FileIcon = () => (
  <svg
    viewBox='64 64 896 896'
    focusable='false'
    data-icon='file-text'
    width='1em'
    height='1em'
    fill='currentColor'
    aria-hidden='true'
  >
    <path
      fill='currentColor'
      d='M832 384H576V128H192v768h640zm-26.496-64L640 154.496V320zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32m160 448h384v64H320zm0-192h160v64H320zm0 384h384v64H320z'
    ></path>
  </svg>
)

const FolderIcon = () => (
  <svg
    viewBox='64 64 896 896'
    focusable='false'
    data-icon='file-text'
    width='1em'
    height='1em'
    fill='currentColor'
    aria-hidden='true'
  >
    <path
      fill='currentColor'
      d='M128 192v640h768V320H485.76L357.504 192zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32'
    ></path>
  </svg>
)

const IconMap = {
  file: <FileIcon />,
  folder: <FolderIcon />,
  addFile: <AddFileIcon />,
  addFolder: <AddFolderIcon />,
  delete: <DeleteIcon />,
  edit: <EditIcon />,
  folderOpen: <FolderOpenIcon />,
  right: <RightIcon />,
  // close: <CloseIcon />,
  // check: <CheckIcon />,
}

interface IIcon {
  name: keyof typeof IconMap
  style?: {
    color?: string
    fontSize?: string | number
  }

  [key: string]: any
}

export const Icon: React.FC<IIcon> = (props) => {
  const { style, name, ...rest } = props
  return (
    <span {...rest} style={{ display: 'flex', alignItems: 'center', ...style }}>
      {IconMap[name]}
    </span>
  )
}
