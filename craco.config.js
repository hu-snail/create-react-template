const path = require("path");

// sass全局配置
const sassResourcesLoader = require("craco-sass-resources-loader");

module.exports = {
  // webpack配置
  webpack: {
    // 配置别名
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // craco 插件配置
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: ["./src/styles/variable.scss", "./src/styles/common.scss"],
      },
    },
  ],
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
