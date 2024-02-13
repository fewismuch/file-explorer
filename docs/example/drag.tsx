import React, {useState} from "react";
import {FileExplorer, INode} from "@carbontian/file-explorer";
import {filesData} from "./filesData";

export default () => {
  const [treeData, setTreeData] = useState<INode[]>(filesData);

  const handleChange = (newData: INode[]) => {
    setTreeData(newData)
  }

  return (
    <div>
      <FileExplorer
        data={treeData}
        rootId={0}
        onChange={handleChange}
        enableDrag
      />
    </div>
  )
}
