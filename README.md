# 创建

## 使用 cra 创建一个 react+ts 项目

npx create-react-app react-app --template typescript

## 添加 eject

eject 使用是因为如果需要使用 less（cra 脚手架中默认使用 sass）或其他配置路径等需要修改时，则需要手动修改 webpack 的配置。这个时候就可以用到 eject。
PS: 它是单项操作当 npm/yarn run eject 时无法还原。所以如需配置 eject 在项目创建时执行。

配置完成后发现项目中的变化
![这是图片](static/img/image.png)

### package.json

#### script

eject 操作后，eject 命令消失（不可逆操作）
不再使用 react-script 封装的插件执行命令，直接基于 node 执行对应的入口文件

#### dependency

eject 之后，会把 webpack 打包需要的所有模块都重新安装一遍，放在依赖项中。

-   babel-preset-react-app:对原来的@babel/preset-env 语法包的重写，目的将 ES6 转换为 ES5 语法，识别 react 语法，实现代码转换。

### jest

打包测试

### webpackDevServer.config.js

webpack-dev-server(启动本地服务插件)的相关配置

### webpack.config.js

脚手架默认的 webpack 打包的相关配置

### paths.js

打包中需要的一些路径管理

### env.js

环境变量的处理

## 添加 less 预编译

需要在 react-app-env.d.ts 文件中添加

```js
declare module "*.less" {
  const less: any;
  export default less;
}
```

同时修改 config 文件夹下面的 webpack.config.js 文件内增加 less 配置或将所有 sass 配置改为 less 配置也可以
可在 webpack.config.js 搜 less-start 和 less-end 为新增 less 配置项

## 添加项目基础配置

-   绝对路径@
    -   config 文件夹下的 webpack.config 内 搜索 alias，在对象内配置一行 `'@': path.resolve('src'),`
    -   在 根目录的 tsconfig.json 内 compilerOptions 对象内配置一行 `"paths": { "@/*": ["./src/*"] }`

## antd+tailwindcss

安装 antdui 框架以及使用 tailwindcss

-   yarn add antd @ant-design/icons tailwindcss
-   创建 tailwind.config.js 配置文件
-   引入 tailwind 功能模块

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

    -   全局使用 antd 的 CSS 变量
        -   引入 ConfigProvider 组件添加cssVar:true
            ```js
            theme={{
                      cssVar: true,
                  }}
            ```

## react-router-dom

## 项目结构划分

### src 目录改造

- pages：路由页面
- components：页面通用组件
  - layout：项目页面layout
  - sider-menu：左侧菜单栏
- utils：公共工具
- router：路由配置
