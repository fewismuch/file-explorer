import FileExplorer, { INode } from '@rainetian/file-explorer'
import React, { useState } from 'react'

import { treeData } from './treeData'

const App = () => {
  const [data, setData] = useState<INode[]>(treeData)

  const handleChange = (newData: INode[]) => {
    setData(newData)
  }

  return (
    <div>
      <FileExplorer data={data} rootId={0} onChange={handleChange} />
    </div>
  )
}
export default App
