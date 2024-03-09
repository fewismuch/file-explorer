import FileExplorer, { INode } from '@rainetian/file-explorer'
import React, { useState } from 'react'

import { treeData } from './treeData'

const App = () => {
  const [node, setNode] = useState<INode | null>(null)
  return (
    <div>
      <div>Selected: {node?.text}</div>
      <br />
      <FileExplorer
        data={treeData}
        rootId={0}
        initialOpen
        onSelect={(node) => {
          console.log(node)
          setNode(node)
        }}
        selectedId={2}
      />
    </div>
  )
}

export default App
