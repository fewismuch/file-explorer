import FileExplorer, { ChangeAction, IFileExplorerMethods, INode } from '@rainetian/file-explorer'
import React, { useRef, useState } from 'react'

import { filesData } from './filesData'

const App = () => {
  const fileExplorerRef = useRef<IFileExplorerMethods>(null)
  const [treeData, setTreeData] = useState<INode[]>(filesData)

  const handleChange = (
    newData: INode[],
    oldData: INode[],
    type: ChangeAction,
    targetNode?: INode
  ) => {
    console.log('change type:', type)
    console.log('targetNode:', targetNode)
    console.log('oldData:', oldData)
    setTreeData(newData)
  }

  return (
    <div>
      <button onClick={() => fileExplorerRef.current.addFile()}>add file</button>
      <button onClick={() => fileExplorerRef.current.addFolder()}>add folder</button>
      <button onClick={() => fileExplorerRef.current.closeAll()}>closeAll</button>
      <button onClick={() => fileExplorerRef.current.openAll()}>openAll</button>

      <FileExplorer
        fileExplorerRef={fileExplorerRef}
        data={treeData}
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
