# Create-React-App创建React项目流程

### 1.快速开始

```shell
npx create-react-app my-app
cd my-app
yarn start
```

### 2.安装UI库 ArcoDesign

```shell
yarn add @arco-design/web-react
```

#### 2.1 ArcoDesign基础使用

```react
import React from "react";
import ReactDOM from "react-dom";
import { Button } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";

ReactDOM.render(
  <Button type="primary">Hello Arco</Button>,
  document.querySelector("#root")
);
```

#### 2.2 webpack 按需加载

##### 2.2.1安装依赖

```shell
npm install @craco/craco -D
# or
yarn add @craco/craco -D

```

```shell
npm install babel-plugin-import -D
# or
yarn add babel-plugin-import -D
```

在项目根目录下创建`carco.config.js`

```js
// craco-config.js
module.exports = {
  babel: {
    plugins: [
      [
        "import",
        {
          libraryName: "@arco-design/web-react",
          libraryDirectory: "es",
          camel2DashComponentName: false,
          style: "css", // 样式按需加载
        },
      ],
    ],
  },
};

```

修改`package.json`启动命令

```json
 "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
```

在终端重新运行项目即可

```shell
yarn start
```

### 3.使用sass

##### 3.1 安装依赖

```shell
yarn add node-sass -D
# or 
npm i node-sass -D
```

##### 3.2 全局使用sass

```shell
yarn add craco-sass-resources-loader -D
# or 
npm i craco-sass-resources-loader -D
```

##### 3.3 在`src`目录下创建`styles`文件，完整目录如下：

```shell
└── src
    ├── styles # 样式文件
    │   ├──  variable.scss # 变量样式文件
    │   ├──  common.scss # 公共样式文件
```

##### 3.4 配置`craco.config.js`

```js
const sassResourcesLoader = require("craco-sass-resources-loader");

module.exports = {
  // craco 插件配置
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: ["./src/styles/variable.scss", "./src/styles/common.scss"],
      },
    },
  ],
}
```

##### 3.5 重新启动项目



### 4.路由

##### 4.1安装依赖

```shell
yarn add react-router-dom
# or 
npm i react-router-dom
```

##### 4.2创建文件

在`src`目录下创建`views`,完整目录如下：

```shell
└── src
    ├── views # 所有页面文件
    │   └── index # 首页
    │       ├── index.jsx
    │   └── detail # 详情页
    │       ├── index.jsx
```

##### 4.3 创建页面布局文件

在`src`目录下创建`layout/index.jsx`

```js
// layout/index.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "@arco-design/web-react";

function PublicLayout() {
  const { Header, Footer, Content } = Layout;
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default React.memo(PublicLayout);

```

其中`<Outlet/>`类似于vue路由中的`<router-view></router-view>`

##### 4.4 创建路由配置文件

在`src`目录下创建`routers/index.js`路由文件

```js
// routers/index.js
import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";

import LayoutPage from "@/layout";

const Home = lazy(() => import("@/views/index"));
const TempDetail = lazy(() => import("@/views/detail"));

const routeList = [
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "detail",
        element: <TempDetail />,
      },
    ],
  },
];

const RenderRouter = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;

```

`@`需要提前配置，配置如下：

```js
// craco.config.js 
const path = require("path");
module.exports = {
  // webpack配置
  webpack: {
    // 配置别名
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}
```

##### 4.5 修改`App.js`文件

```js
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import RenderRouter from "./routers";
import LoadingComponent from "@/compontents/Loading";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingComponent />}>
        <RenderRouter />
      </Suspense>
    </BrowserRouter>
  );
}
```

`Suspense`需要`fallback` 需要注册一个全局的加载组件

##### 4.6 创建`compontents/Loading/index.jsx`

在创建文件前，先安装`nprogress`加载组件

```shell
npm i nprogress
# or 
yarn add nprogress
```

组件代码如下：

```jsx
import React, { Component } from "react";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default class LoadingComponent extends Component {
  constructor(props) {
    super(props);
    NProgress.start();
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    return <div />;
  }
}
```


