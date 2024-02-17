import FileExplorer, { INode } from '@rainetian/file-explorer'
import React, { useState } from 'react'

import { filesData } from './filesData'

const App = () => {
  const [treeData, setTreeData] = useState<INode[]>(filesData)

  const handleChange = (newData: INode[]) => {
    setTreeData(newData)
  }

  return (
    <div>
      <FileExplorer data={treeData} rootId={0} onChange={handleChange} enableDrag />
    </div>
  )
}
export default App
