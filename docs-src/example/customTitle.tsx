import FileExplorer, { INode } from '@rainetian/file-explorer'
import React from 'react'

import { filesData } from './filesData'

const App = () => {
  const Title = ({ node }: { node: INode }) => {
    return (
      <span style={{ color: 'blue' }}>
        {node.id}-{node.text}
      </span>
    )
  }

  return (
    <div style={{ width: 250, border: '1px solid #ccc' }}>
      <FileExplorer
        data={filesData}
        rootId={0}
        titleRender={(node: INode) => <Title node={node} />}
        switcherIcon={<span>▶️</span>}
        showIcon={false}
      />
    </div>
  )
}
export default App
