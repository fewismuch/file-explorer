import FileExplorer, { INode, fileExplorerUtils } from '@rainetian/file-explorer'
import React, { useState } from 'react'

import { filesData } from './filesData'

const App = () => {
  const [data, setData] = useState<INode[]>(fileExplorerUtils.files2tree(filesData))

  const handleChange = (newData: INode[]) => {
    setData(newData)
  }

  const fileIcon = (fileSuffix: string) => {
    // 提供了一个获取icon8 图标url的方法，可根据文件后缀自定义图标
    const iconSrc = fileExplorerUtils.getFileIcon8Url(fileSuffix)
    return iconSrc ? <img src={iconSrc} /> : null
  }

  return (
    <div style={{ width: 250, border: '1px solid #ccc', padding: 12 }}>
      <FileExplorer
        data={data}
        rootId={0}
        onChange={handleChange}
        initialOpen
        fileIcon={fileIcon}
      />
    </div>
  )
}
export default App
