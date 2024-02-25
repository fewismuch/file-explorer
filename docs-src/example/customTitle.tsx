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
    <FileExplorer
      data={filesData}
      rootId={0}
      titleRender={(node: INode) => <Title node={node} />}
      switcherIcon={<span>▶️</span>}
      showIcon={false}
    />
  )
}
export default App
