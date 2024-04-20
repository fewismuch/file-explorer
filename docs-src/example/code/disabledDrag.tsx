import FileExplorer from '@rainetian/file-explorer'
import React from 'react'

import { treeData } from './treeData'

const App = () => {
  return (
    <FileExplorer
      data={treeData}
      rootId={0}
      canDrag={() => false}
      initialOpen
      enableSelect={false}
    />
  )
}
export default App
