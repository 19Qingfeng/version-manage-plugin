<div align="center">
 
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b148304186f0459db30bb54f39de44ab~tplv-k3u1fbpfcp-zoom-1.image">
  </a>
  <h1>V Webpack Plugin</h1>
  <p>A webpack plugin for better managment your package version number.</p>
  <img src="http://hycoding.com/v-webpack.png">
</div>

<h2 align="center">安装</h2>

<h3>Webpack 5</h3>

```bash
  npm i --save-dev v-webpack-plugin
```

```bash
  yarn add --dev v-webpack-plugin
```

<h3>Webpack 4</h3>

```bash
  npm i --save-dev v-webpack-plugin
```

```bash
  yarn add --dev v-webpack-plugin
```

<h2 align="center">使用</h2>

`VWebpackPlugin`可以更好的管理你的包版本，发布时通过调用`shell`获得远程最新的包版本号同时智能的指引你发布的包版本。

**webpack.config.js**

```js
const path = require('path');
const VWebpackPlugin = require('v-webpack-plugin').default;

module.exports = {
  entry: './index.js',
  plugins: [
    new VWebpackPlugin({
      name: 'vue',
      output: path.resolve(__dirname, './dist'),
      registry: 'http://registry.npmjs.org/',
    }),
  ],
  output: {
    filename: 'name.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

<h2 align="center">参数</h2>

|   Name   |  Type  |           Default            | Description                    |
| :------: | :----: | :--------------------------: | :----------------------------- |
|   name   | string |          `required`          | 生成的`package.json`中的包名称 |
|  output  | string |          `required`          | 打包后生成内容的文件夹路径     |
| registry | string | `http://registry.npmjs.org/` | `npm`源                        |
