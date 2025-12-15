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
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
        <button onClick={() => fileExplorerRef.current?.addFile()}>add file</button>
        <button onClick={() => fileExplorerRef.current?.addFolder()}>add folder</button>
        <button onClick={() => fileExplorerRef.current?.addFile(1)}>add file in Folder1</button>
        <button onClick={() => fileExplorerRef.current?.closeAll()}>closeAll</button>
        <button onClick={() => fileExplorerRef.current?.openAll()}>openAll</button>
        <button onClick={() => console.log(fileExplorerRef.current?.getFiles())}>getFiles</button>
        <button onClick={() => console.log(fileExplorerRef.current?.getData())}>getData</button>
        <button onClick={() => fileExplorerRef.current?.edit(2)}>edit File1</button>
        <button onClick={() => fileExplorerRef.current?.remove(3, false)}>remove File2</button>
        <button onClick={() => fileExplorerRef.current?.open(1)}>open Folder1</button>
        <button onClick={() => fileExplorerRef.current?.close(1)}>close Folder1</button>
      </div>
      <div style={{ width: 300, border: '1px solid #ccc', padding: 12 }}>
        <FileExplorer
          fileExplorerRef={fileExplorerRef}
          data={data}
          onChange={handleChange}
          onSelect={(node: INode) => console.log(node)}
          showActions
          initialOpen
        />
      </div>
    </>
  )
}

export default App
