import FileExplorer, { INode } from '@rainetian/file-explorer'
import React from 'react'

import { treeData } from './treeData'

const App = () => {
  const Title = ({ node }: { node: INode }) => {
    return <span style={{ color: 'blue' }}>#{node.text}😎</span>
  }

  return (
    <FileExplorer
      data={treeData}
      titleRender={(node: INode) => <Title node={node} />}
      switcherIcon={<span>▶️</span>}
      fileIcon={false}
    />
  )
}
export default App
