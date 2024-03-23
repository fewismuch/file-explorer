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
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <button onClick={() => fileExplorerRef.current?.addFile()}>add file</button>
        <button onClick={() => fileExplorerRef.current?.addFolder()}>add folder</button>
        <button onClick={() => fileExplorerRef.current?.closeAll()}>closeAll</button>
        <button onClick={() => fileExplorerRef.current?.openAll()}>openAll</button>
        <button onClick={() => console.log(fileExplorerRef.current?.getFiles())}>getFiles</button>
        <button onClick={() => console.log(fileExplorerRef.current?.getData())}>getData</button>
        <button onClick={() => fileExplorerRef.current?.edit(2)}>edit File1</button>
        <button onClick={() => fileExplorerRef.current?.remove(3, false)}>remove File2</button>
      </div>
      <div style={{ width: 300, border: '1px solid #ccc' }}>
        <FileExplorer
          fileExplorerRef={fileExplorerRef}
          data={data}
          onChange={handleChange}
          onSelect={(node: INode) => console.log(node)}
          rootId={0}
          showActions
          initialOpen
        />
      </div>
    </>
  )
}

export default App
