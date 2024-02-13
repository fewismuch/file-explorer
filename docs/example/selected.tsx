import React, {useState} from "react";
import {FileExplorer, INode} from "@carbontian/file-explorer";
import {filesData} from "./filesData";

export default () => {
  const [node, setNode] = useState<INode | null>(null)
  return (
    <div>
      <div>Selected: {node?.text}</div>
      <FileExplorer data={filesData} rootId={0} initialOpen onSelect={(node) => setNode(node)}/>
    </div>
  )
}
