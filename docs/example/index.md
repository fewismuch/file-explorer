---
nav: ' '
title: 示例
---

# 介绍

一个文件浏览器组件，可拖拽可编辑

# 组件示例

## 基础

这是一个最基础的示例, `rootId` 为根节点id，默认是空字符串`''`, `data` 为树形结构的数据

```tsx
import FileExplorer from '@rainetian/file-explorer'

import { filesData } from './filesData'

export default () => {
  return (
    <div style={{ width: 250, border: '1px solid #ccc' }}>
      <FileExplorer data={filesData} rootId={0} />
    </div>
  )
}
```
