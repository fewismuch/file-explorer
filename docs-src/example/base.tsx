import FileExplorer, { INode } from '@rainetian/file-explorer'
import React, { useState } from 'react'

import { treeData } from './treeData'

const App = () => {
  const [data, setData] = useState<INode[]>(treeData)

  const handleChange = (newData: INode[]) => {
    setData(newData)
  }

  return (
    <div style={{ width: 250, border: '1px solid #ccc', padding: 12 }}>
      <FileExplorer data={data} rootId={0} initialOpen onChange={handleChange} />
    </div>
  )
}
export default App
