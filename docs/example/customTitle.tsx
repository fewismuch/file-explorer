import React from "react";
import {FileExplorer, INode} from "@carbontian/file-explorer";
import {filesData} from "./filesData";

export default () => {

  const Title = ({node}: { node: INode }) => {
    return <span style={{color: 'blue'}}>{node.id}-{node.text}</span>
  }

  return (
    <div style={{width: 250, border: '1px solid #ccc'}}>
      <FileExplorer
        data={filesData}
        rootId={0}
        titleRender={(node) => <Title node={node}/>}
        switcherIcon='▶️'
        showIcon={false}
      />
    </div>
  )
}
