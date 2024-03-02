import { FileExplorer } from './FileExplorer'
import { files2tree, tree2files } from './FileExplorer/utils'

export type * from './FileExplorer/types'

export const fileExplorerUtils = {
  files2tree,
  tree2files,
}

export default FileExplorer
