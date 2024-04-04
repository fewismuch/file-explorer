import FileExplorer, { INode, fileExplorerUtils } from '@rainetian/file-explorer'
import React, { useState } from 'react'

import { filesData } from './filesData'

const App = () => {
  const [data, setData] = useState<INode[]>(fileExplorerUtils.files2tree(filesData))

  const handleChange = (newData: INode[]) => {
    setData(newData)
  }

  const fileIcon = (fileSuffix: string) => {
    const iconMap: Record<string, string> = {
      js: 'https://img.icons8.com/color/48/000000/javascript.png',
      css: 'https://img.icons8.com/color/48/000000/css3.png',
      html: 'https://img.icons8.com/color/48/000000/html-5.png',
      json: 'https://img.icons8.com/color/48/000000/json.png',
      tsx: 'https://img.icons8.com/color/48/000000/typescript.png',
    }
    const iconSrc = iconMap[fileSuffix]
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
