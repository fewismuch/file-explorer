import { FileExplorer } from './FileExplorer'
import { files2tree, getFileIcon8Url, tree2files } from './FileExplorer/utils'

export type * from './FileExplorer/types'

export * from './FileExplorer/Icons'

export const fileExplorerUtils = {
  files2tree,
  tree2files,
  getFileIcon8Url,
}

export default FileExplorer
