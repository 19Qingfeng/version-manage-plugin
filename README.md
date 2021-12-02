<div align="center">
 
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b148304186f0459db30bb54f39de44ab~tplv-k3u1fbpfcp-zoom-1.image">
  </a>
  <h1>Version Manage Plugin</h1>
  <p>A webpack plugin for better managment your package version number.</p>
  <img src="http://hycoding.com/v-webpack.png">
</div>

<h2 align="center">安装</h2>

<h3>Webpack 5</h3>

```bash
  npm i --save-dev version-manage-plugin
```

```bash
  yarn add --dev version-manage-plugin
```

<h3>Webpack 4</h3>

```bash
  npm i --save-dev version-manage-plugin@0.0.4
```

```bash
  yarn add --dev version-manage-plugin@0.0.4
```

<p> 最新0.0.5版本暂时删除`webpack 4`兼容 </p>

<h2 align="center">使用</h2>

`version-manage-plugin`可以更好的管理你的包版本，发布时通过调用`shell`获得远程最新的包版本号同时智能的指引你发布的包版本。

**webpack.config.js**

```js
const path = require('path');
const VWebpackPlugin = require('version-manage-plugin').default;

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

<h2 align="center">环境变量</h2>

`version-manage-plugin`还支持通过环境变量注入的方式更新包版本。

### `__version__plugin__mode`

- `__version__plugin__mode=patch`
- `__version__plugin__mode=minor`
- `__version__plugin__mode=major`
- `__version__plugin__mode=auto`

当传递`patch`、`minor`、`major`时，会根据对应的值直接进行版本号修改跳过询问步骤。

当传递`auto`时，会进入版本号询问环节，支持上述三种定义以及输入自定义版本号。

默认不传递`__version__plugin__mode`时，开启询问模式。
