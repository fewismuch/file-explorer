import { defineConfig } from 'father'

export default defineConfig({
  plugins: ['./plugins/loader.ts'],
  umd: {
    output: 'dist/umd',
    externals: {
      'react': 'react',
      'react-dom': 'react-dom',
      '@minoru/react-dnd-treeview': '@minoru/react-dnd-treeview'
    }
  },
  esm: { output: 'dist', transformer: 'babel' }, // 必须要使用 babel 模式
  extraBabelPlugins: [
    [
      './plugins/babel-less-to-css.js', // 把 js/ts 文件中的 '.less' 字符转为 '.css'
      {
        test: '\\.less',
      },
    ],
  ],
  // umd: {
  //   output: 'dist',
  //   extractCSS: false,
  // },
})
