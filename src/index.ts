import { FileExplorer } from './FileExplorer'
import { files2tree, findNodeIdByPath, tree2files } from './FileExplorer/utils'

export type * from './FileExplorer/types'

export const fileExplorerUtils = {
  files2tree,
  tree2files,
  findNodeIdByPath,
}

export default FileExplorer
