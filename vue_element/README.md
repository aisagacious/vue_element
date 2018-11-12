# wh
参考:https://github.com/PanJiaChen/vue-element-admin
> pc

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 解决npm run build打包运行路径问题 
    打开config 下index.js 53行 
                assetsPublicPath: '/'
        修改为:  assetsPublicPath: './'

### vue2.x在IE中打开空白 主要是IE对promise的支持不好
            安装: npm install --save babel-polyfill
    eg: 配置 
            1. 在build文件夹下找到webpack.base.conf.js
               找到24行:  原代码：entry: {
                                    app: './src/main.js'
                                },

                         改为：  entry: {
                                    app: ['babel-polyfill', './src/main.js']
                                },
            2. main.js 中引入  import 'babel-polyfill'  // IE打开空白问题


### 使用sass
            安装: npm install sass-loader node-sass --save-dev
    eg: 配置
            1.在build文件夹下的webpack.base.config.js，在module.rules里面加入代码
                {
                    test: /\.scss$/,
                    loaders: ["style", "css", "sass"]
                }

            2.在style中配置就可以使用sass <style lang="scss" scoped></style>

### 路由懒加载  查看src->page->module->index.js    以及 src->router->index.js 查看


### 使用 vuex 状态管理
            安装: npm i vuex -S

                详细目录查看:src-> vuex文件目录下


### 使用axios 发送网络配置全局加载loading...
            安装: npm i axios -S



### 使用element-ui   http://element-cn.eleme.io/#/zh-CN
            安装: npm i element-ui -S
    eg: 配置        
            1. main.js
                import ElementUI from 'element-ui'
                Vue.use(ElementUI)

            2. babel-plugin-component css样式按需引入
             （如果在ie中样式出现问题 可以改成全局引入 import 'element-ui/lib/theme-chalk/index.css'）
               npm install babel-plugin-component -D 

               找到.babelrc文件修改避免问题把原文件保存一份:  
                {
                        "presets": [
                            ["env", {
                            "modules": false,
                            "targets": {
                                "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                            }
                            }],
                            "stage-2"
                        ],
                        "plugins": ["transform-vue-jsx", "transform-runtime"],
                        "env": {
                            "test": {
                            "presets": ["env", "stage-2"],
                            "plugins": ["transform-vue-jsx", "transform-es2015-modules-commonjs", "dynamic-import-node"]
                            }
                        }
                    }

                    修改后： 对比文件看不同出 *配置后 复制一段代码使用 css生效 说明我们按需引入配置好了
                    {
                        "presets": [
                            ["env", {
                            "modules": false,
                            "targets": {
                                "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                            }
                            }],
                            "stage-2"
                        ],
                        "plugins": ["transform-vue-jsx", "transform-runtime", ["component", {
                            "libraryName": "element-ui",
                            "styleLibraryName": "theme-chalk"
                            }]
                        ],
                        "env": {
                            "test": {
                            "presets": ["env", "stage-2"],
                            "plugins": ["transform-vue-jsx", "transform-es2015-modules-commonjs", "dynamic-import-node"]
                            }
                        }
                    }


### 本人不喜欢 eslint检查已关闭
    如有需要在 build下中webpack.base.conf.js 中第11行打开注释


### 使用vue-i18n 实现多语言切换
    npm install vue-i18n -S
    这里使用js-cookie存储语言


### js-cookie 存储登录状态
    npm i js-cookie -S

### 基于vue的可编辑日历组件
    npm install vue-fullcalendar@latest --save

### 上传图片 裁剪并上传服务器
    npm install --save vue-croppa

### 图片预览功能
    npm i vue-preview -S

### 使用Ueditor 富文本编辑器 https://github.com/wangfupeng1988/wangEditor/blob/master/README.md
    npm install wangeditor -S


### 图片预览： npm install --save vue-picture-preview

### 导出表格插件
    npm install --save xlsx file-saver