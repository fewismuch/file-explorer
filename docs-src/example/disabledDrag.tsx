import FileExplorer from '@rainetian/file-explorer'
import React from 'react'

import { treeData } from './treeData'

const App = () => {
  return (
    <div>
      <FileExplorer data={treeData} rootId={0} canDrag={() => false} initialOpen={true} />
    </div>
  )
}
export default App
