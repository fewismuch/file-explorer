import React from "react";
import {FileExplorer} from "@carbontian/file-explorer";
import {filesData} from "./filesData";

export default () => {
  return (
    <div style={{width: 250,border:'1px solid #ccc'}}>
      <FileExplorer data={filesData} rootId={0}/>
    </div>
  )
}
