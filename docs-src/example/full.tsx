import FileExplorer, { ChangeAction, IFileExplorerRef, INode } from '@rainetian/file-explorer'
import React, { useRef, useState } from 'react'

import { filesData } from './filesData'

const App = () => {
  const fileExplorerRef = useRef<IFileExplorerRef>(null)
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

  const addFile = () => {
    fileExplorerRef.current?.addFile()
  }

  const addFolder = () => {
    fileExplorerRef.current?.addFolder()
  }

  return (
    <div>
      <button onClick={addFile}>add file</button>
      <button onClick={addFolder}>add folder</button>
      <FileExplorer
        fileExplorerRef={fileExplorerRef}
        data={treeData}
        enableDrag
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
