import { FileExplorer, INode } from '@rainetian/file-explorer'
import React, { useState } from 'react'

import { filesData } from './filesData'

const App = () => {
  const [node, setNode] = useState<INode | null>(null)
  return (
    <div>
      <div>Selected: {node?.text}</div>
      <FileExplorer data={filesData} rootId={0} initialOpen onSelect={(node) => setNode(node)} />
    </div>
  )
}

export default App
