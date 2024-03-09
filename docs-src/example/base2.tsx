/**
 * title: 我是标题
 * description: 我是简介，我可以用 `Markdown` 来编写
 */
import FileExplorer, { INode, fileExplorerUtils } from '@rainetian/file-explorer'
import React, { useEffect, useState } from 'react'

import { filesData } from './filesData'

const App = () => {
  const files = fileExplorerUtils.files2tree(filesData)
  const selectedFile = fileExplorerUtils.findNodeIdByPath(files, '/src/App.vue')
  const [data, setData] = useState<INode[]>(files)

  const handleChange = (newData: INode[]) => {
    setData(newData)
  }

  useEffect(() => {}, [])

  return (
    <div style={{ width: 250, border: '1px solid #ccc', padding: 0 }}>
      <FileExplorer
        data={data}
        rootId={0}
        initialOpen
        selectedId={selectedFile}
        onChange={handleChange}
        onSelect={(node) => {
          console.log(fileExplorerUtils.findPathByNodeId(files, node.id))
        }}
      />
    </div>
  )
}
export default App
