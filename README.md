# file-explorer

[![NPM version](https://img.shields.io/npm/v/@carbontian/file-explorer.svg?style=flat)](https://npmjs.org/package/file-explorer)

## Overview

一个功能丰富的文件浏览器React组件，支持拖拽、编辑、排序等功能。

### 特性

- 📁 文件树展示
- ✏️ 可编辑文件名
- 🔄 拖拽排序和移动
- ➕ 创建文件/文件夹
- ❌ 删除文件/文件夹
- 🎨 主题支持（暗色/亮色）
- 📱 响应式设计
- 🧩 丰富的API和自定义选项

## Installation

```bash
npm install @rainetian/file-explorer
```

## Usage

### 基础使用

```tsx
import FileExplorer, { INode, fileExplorerUtils } from '@rainetian/file-explorer'
import React, { useState } from 'react'

const filesData = {
  '/public/index.html': '',
  '/src/App.tsx': '',
  '/src/main.tsx': '',
  '/src/style.css': '',
  '/package.json': '',
  '/tsconfig.json': '',
}

const App = () => {
  const [data, setData] = useState<INode[]>(fileExplorerUtils.files2tree(filesData))

  const handleChange = (newData: INode[]) => {
    setData(newData)
  }

  return (
    <div style={{ width: 250, border: '1px solid #ccc', padding: 12 }}>
      <FileExplorer data={data} rootId={0} onChange={handleChange} initialOpen />
    </div>
  )
}

export default App
```

### 数据格式转换

组件提供了便捷的工具函数来处理文件数据格式转换：

```tsx
// 将扁平的文件映射转换为树形结构
const treeData = fileExplorerUtils.files2tree(filesData)

// 将树形结构转换回扁平的文件映射
const filesData = fileExplorerUtils.tree2files(treeData)

/// 提供了一个获取icon8 图标url的方法，可根据文件后缀自定义图标
const iconSrc = fileExplorerUtils.getFileIcon8Url('tsx')
```

## API

### FileExplorer Props

| 属性名 | 类型 | 描述 |
| --- | --- | --- |
| data | `INode[]` | 树形结构的数据 |
| rootId | `string \| number` | 根节点ID |
| onChange | `(newTree: INode[], changeParams: IFileExplorerChangeParams) => void` | 数据变更回调 |
| onSelect | `(node: INode) => void` | 节点选中回调 |
| fileExplorerRef | `React.ForwardedRef<IFileExplorerMethods>` | 组件实例引用 |
| theme | `'dark' \| 'light'` | 主题模式 |
| enableSelect | `boolean` | 是否允许选中节点 |
| showActions | `boolean` | 是否显示操作按钮 |
| enableSort | `boolean` | 是否允许排序 |
| allowRepeatText | `boolean` | 是否允许重复名称 |
| dragOverAutoExpand | `boolean` | 拖拽到文件夹上是否自动展开 |
| clickRowAutoExpand | `boolean` | 点击行时是否自动展开 |

### INode 接口

```ts
interface INode {
  id: number | string
  parent: number | string
  text: string
  droppable?: boolean
  [propName: string]: any
}
```

### fileExplorerUtils 工具函数

- `files2tree(files: FileMap, rootId?: number | string): INode[]` - 将文件映射转换为树形结构
- `tree2files(tree: INode[], rootId?: number | string): FileMap` - 将树形结构转换为文件映射
- `getFileIcon8Url(ext: string, options?): string` - 获取文件图标URL

### fileExplorerRef 实例方法

通过ref可以调用组件的实例方法：

- `addFile(parent?: string | number)` - 添加文件
- `addFolder(parent?: string | number)` - 添加文件夹
- `remove(id: string | number, draft?: boolean)` - 删除节点
- `edit(id: string | number)` - 编辑节点
- `getFiles(rootId?: number | string)` - 获取文件映射
- `getData()` - 获取当前树形数据
- `open(id: string | number)` - 展开节点
- `close(id: string | number)` - 折叠节点
- `openAll()` - 展开所有节点
- `closeAll()` - 折叠所有节点

## Examples

查看 [`docs-src/example`](./docs-src/example) 目录获取更多使用示例：

- [基础用法](./docs-src/example/code/base.tsx)
- [自定义标题](./docs-src/example/code/customTitle.tsx)
- [禁用拖拽](./docs-src/example/code/disabledDrag.tsx)
- [事件处理](./docs-src/example/code/event.tsx)
- [完整功能](./docs-src/example/code/full.tsx)
- [图标定制](./docs-src/example/code/icons.tsx)
- [排序功能](./docs-src/example/code/sort.tsx)

## Development

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建项目
npm run build

# 构建文档
npm run docs:build
```

## LICENSE

MIT
