import { FileExplorer } from './FileExplorer'
import { files2tree, findChangedNode, tree2files } from './FileExplorer/utils'

export type * from './FileExplorer/types'

export * from './FileExplorer/Icons'

export const fileExplorerUtils = {
  files2tree,
  tree2files,
  findChangedNode,
}

export default FileExplorer
