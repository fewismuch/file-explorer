/**
 * title: 我是标题
 * description: 我是简介，我可以用 `Markdown` 来编写
 */
import { FileExplorer } from '@rainetian/file-explorer'
import React from 'react'

import { filesData } from './filesData'

const App = () => {
  return (
    <div style={{ width: 250, border: '1px solid #ccc' }}>
      <FileExplorer data={filesData} rootId={0} />
    </div>
  )
}
export default App
