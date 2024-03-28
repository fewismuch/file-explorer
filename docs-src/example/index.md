---
nav: ' '
title: 示例
---

# 介绍

一个树形文件浏览器组件，可拖拽可编辑

# 组件示例

## 基础

<code src="./base.tsx"></code>

组件数据格式为:
```tsx | pure
const treeData = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'Folder 1',
  },
  {
    id: 2,
    parent: 1,
    droppable: false,
    text: 'File1-1',
  },
]
```

如果是文件夹对象格式（如下示例），可以使用 `fileExplorerUtils.files2tree(treeData)` 转换
```tsx | pure
const filesData = {
  '/public/index.html': '',
  '/src/App.tsx': '',
  '/src/main.tsx': '',
  '/src/style.css': '',
  '/package.json': '',
  '/tsconfig.json': '',
}
```

`fileExplorerUtils` 还提供了树形数据和文件对象的相互转换方法，`fileExplorerUtils.tree2files(filesData)`

根据实际情况选择使用，下面示例使用tree格式数据



## 自定义渲染

<code src="./customTitle.tsx"></code>

## 不可拖拽不可选中

<code src="./disabledDrag.tsx"></code>

## 方法调用

<code src="./event.tsx"></code>


## 完整配置项

<code src="./full.tsx"></code>

## 手动排序

<code src="./sort.tsx"></code>

## 自定义actions

<code src="./actions.tsx"></code>
