import FileExplorer, { fileExplorerUtils, INode } from '@rainetian/file-explorer'
import { useSetState } from 'ahooks'
import React, { useState } from 'react'

import { filesData } from './filesData'

const App = () => {
  const [data, setData] = useState<INode[]>(fileExplorerUtils.files2tree(filesData))
  const [selectedNode, setSelectedNode] = useState<INode | null>(null)

  const [options, setOptions] = useSetState<any>({
    initialOpen: false,
    clickRowAutoExpand: true,
    dragOverAutoExpand: false,
    enableSelect: true,
    showActions: true,
    fileIcon: true,
    allowRepeatText: false,
  })

  const handleChange = (newData: INode[]) => {
    setData(newData)
  }

  const fileIcon = (fileSuffix: string) => {
    const iconMap: Record<string, string> = {
      js: 'https://img.icons8.com/color/48/000000/javascript.png',
      css: 'https://img.icons8.com/color/48/000000/css3.png',
      html: 'https://img.icons8.com/color/48/000000/html-5.png',
      json: 'https://img.icons8.com/color/48/000000/json.png',
      tsx: 'https://img.icons8.com/color/48/000000/typescript.png',
    }
    const iconSrc = iconMap[fileSuffix]
    return iconSrc ? <img src={iconSrc} /> : null
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 250, border: '1px solid #ccc', padding: 12, flexShrink: 0 }}>
          <FileExplorer
            data={data}
            rootId={0}
            onChange={handleChange}
            onSelect={(node: INode) => setSelectedNode(node)}
            {...options}
          />
        </div>
        <div style={{ border: '1px solid #ccc', padding: 12, width: '100%' }}>
          <p>
            默认全部展开：
            <label>
              <input
                type='checkbox'
                checked={options.initialOpen}
                onChange={(e) =>
                  setOptions({
                    initialOpen: e.target.checked,
                  })
                }
              />
              initialOpen
            </label>
          </p>

          <p>
            点击行时是否自动展开：
            <label>
              <input
                type='checkbox'
                checked={options.clickRowAutoExpand}
                onChange={(e) =>
                  setOptions({
                    clickRowAutoExpand: e.target.checked,
                  })
                }
              />
              clickRowAutoExpand
            </label>
          </p>

          <p>
            拖拽到文件夹上是否自动展开：
            <label>
              <input
                type='checkbox'
                checked={options.dragOverAutoExpand}
                onChange={(e) =>
                  setOptions({
                    dragOverAutoExpand: e.target.checked,
                  })
                }
              />
              dragOverAutoExpand
            </label>
          </p>

          <p>
            是否允许选中：
            <label>
              <input
                type='checkbox'
                checked={options.enableSelect}
                onChange={(e) =>
                  setOptions({
                    enableSelect: e.target.checked,
                  })
                }
              />
              enableSelect
            </label>
          </p>

          <p>
            是否展示操作按钮：
            <label>
              <input
                type='checkbox'
                checked={options.showActions}
                onChange={(e) =>
                  setOptions({
                    showActions: e.target.checked,
                  })
                }
              />
              showActions
            </label>
          </p>

          <p>
            是否展示操作按钮：
            <label>
              <input
                type='checkbox'
                checked={typeof options.fileIcon === 'boolean' && options.fileIcon}
                onChange={(e) =>
                  setOptions({
                    fileIcon: e.target.checked,
                  })
                }
              />
              fileIcon
            </label>
          </p>

          <p>
            选中的节点：
            {JSON.stringify(selectedNode || '')}
          </p>

          <p>
            是否允许重复名称：
            <label>
              <input
                type='checkbox'
                checked={options.allowRepeatText}
                onChange={(e) =>
                  setOptions({
                    allowRepeatText: e.target.checked,
                  })
                }
              />
              allowRepeatText
            </label>
          </p>

          <p>
            自定义文件图标：
            <label>
              <input
                type='checkbox'
                checked={typeof options.fileIcon === 'function'}
                onChange={(e) => {
                  if (e.target.checked) {
                    console.log(typeof fileIcon)
                    setOptions({
                      fileIcon,
                    })
                  } else {
                    setOptions({
                      fileIcon: true,
                    })
                  }
                }}
              />
              图标
            </label>
          </p>
        </div>
      </div>
    </>
  )
}
export default App
