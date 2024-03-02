export const files = {
  'public/index.html': '1',
  'src/App.vue': '2',
  'src/main.js': '3',
  'package.json': '4',
}

// const files2 = [
//   {
//     id: 1,
//     parent: 0,
//     droppable: true,
//     text: 'public',
//   },
//   {
//     id: 2,
//     parent: 1,
//     droppable: false,
//     text: 'index.html',
//     content: '1',
//   },
//   {
//     id: 3,
//     parent: 0,
//     droppable: true,
//     text: 'src',
//   },
//   {
//     id: 4,
//     parent: 3,
//     droppable: false,
//     text: 'App.vue',
//     content: '2',
//   },
//   {
//     id: 5,
//     parent: 3,
//     droppable: false,
//     text: 'main.js',
//     content: '3',
//   },
//   {
//     id: 6,
//     parent: 0,
//     droppable: false,
//     text: 'package.json',
//     content: '4',
//   },
// ]

export const filesData: any[] = [
  {
    id: 1,
    path: '/a.js',
    content: 'const a = 1',
    droppable: false,
  },
  {
    id: 2,
    path: '/src',
    droppable: true,
  },
  {
    id: 3,
    path: '/src/b.js',
    content: 'const b = 1',
    droppable: false,
  },
]

export const b = [
  {
    id: 1,
    text: 'a.js',
    content: 'const a = 1',
    droppable: false,
    pid: 0,
  },
  {
    id: 2,
    text: 'src',
    droppable: true,
    pid: 0,
  },
  {
    id: 3,
    text: 'b.js',
    content: 'const b = 1',
    droppable: false,
    pid: 2,
  },
]
