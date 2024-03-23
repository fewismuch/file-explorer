import FileExplorer, { INode, fileExplorerUtils } from '@rainetian/file-explorer'
import React, { useState } from 'react'

import { filesData } from './filesData'

const App = () => {
  const [data, setData] = useState<INode[]>(fileExplorerUtils.files2tree(filesData))

  const handleChange = (newData: INode[]) => {
    setData(newData)
  }

  return (
    <div style={{ width: 250, border: '1px solid #ccc', padding: 12 }}>
      <FileExplorer data={data} rootId={0} onChange={handleChange} initialOpen />
    </div>
  )
}
export default App
