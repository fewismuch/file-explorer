import React, {useRef, useState} from 'react';
import {FileExplorer, IFileExplorerRef} from "@carbontian/file-explorer";
import {filesData} from "./filesData";

export default () => {
  const fileExplorerRef = useRef<IFileExplorerRef>(null)
  const [treeData, setTreeData] = useState(filesData);

  const handleChange = (newData, oldData, type, targetNode) => {
    console.log('change type:', type)
    console.log('targetNode:', targetNode)
    console.log('oldData:', oldData)
    setTreeData(newData)
  }

  const addFile = () => {
    fileExplorerRef.addFile()
  }

  const addFolder = () => {
    fileExplorerRef.addFolder()
  }

  return (
    <div style={{border: '1px solid #ccc'}}>
      <button onClick={addFile}>add file</button>
      <button onClick={addFolder}>add folder</button>
      <FileExplorer
        fileExplorerRef={fileExplorerRef}
        data={treeData}
        enableDrag
        onChange={handleChange}
        onSelect={(node) => console.log(node)}
        rootId={0}
        enableSelect
        showActions
        initialOpen
      />
    </div>
  )
}
