/**
 * title: 我是标题
 * description: 我是简介，我可以用 `Markdown` 来编写
 */
import FileExplorer from '@rainetian/file-explorer'
import React from 'react'

import { treeData } from './treeData'

const App = () => {
  return (
    <div style={{ width: 250, border: '1px solid #ccc', padding: 10 }}>
      <FileExplorer data={treeData} rootId={0} />
    </div>
  )
}
export default App
