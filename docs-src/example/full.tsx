import FileExplorer, { IFileExplorerMethods, INode } from '@rainetian/file-explorer'
import { IFileExplorerChangeParams } from 'file-explorer/dist'
import React, { useRef, useState } from 'react'

import { treeData } from './treeData'

const App = () => {
  const fileExplorerRef = useRef<IFileExplorerMethods>(null)
  const [data, setData] = useState<INode[]>(treeData)

  const handleChange = (
    newTree: INode[],
    { action, oldTree, oldNode, newNode }: IFileExplorerChangeParams
  ) => {
    console.log(action, oldTree, oldNode, newNode)
    setData(newTree)
  }

  return (
    <div>
      <button onClick={() => fileExplorerRef.current?.addFile()}>add file</button>
      <button onClick={() => fileExplorerRef.current?.addFolder()}>add folder</button>
      <button onClick={() => fileExplorerRef.current?.closeAll()}>closeAll</button>
      <button onClick={() => fileExplorerRef.current?.openAll()}>openAll</button>

      <FileExplorer
        fileExplorerRef={fileExplorerRef}
        data={data}
        onChange={handleChange}
        onSelect={(node: INode) => console.log(node)}
        rootId={0}
        enableSelect
        showActions
        initialOpen
      />
    </div>
  )
}

export default App
