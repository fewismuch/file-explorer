import { FileExplorer } from './FileExplorer'
import {
  files2tree,
  findChangedNode,
  findNodeIdByPath,
  findPathByNodeId,
  tree2files,
} from './FileExplorer/utils'

export type * from './FileExplorer/types'

export * from './FileExplorer/Icons'

export const fileExplorerUtils = {
  files2tree,
  tree2files,
  findNodeIdByPath,
  findPathByNodeId,
  findChangedNode,
}

export default FileExplorer
