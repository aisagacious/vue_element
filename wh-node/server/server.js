var express = require('express')
var bodyParser = require('body-parser') // 处理请求类型
var cookieParser = require('cookie-parser')
var session = require('express-session') // 中间件express-session
var cors = require('cors')
var path = require('path')
var Connect = require('./Connect/index')


// 新建app 
var app = express()
var userRouter = require('./request/user')

// 连接数据库
Connect()
// cors 解决请求跨域
app.use(cors())
app.use(cookieParser('session'))
app.use(session({
    secret: 'session', // 与cookieParser中的一致 一个String类型的字符串，作为服务器端生成session的签名
    resave: true, // (是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存
    saveUninitialized:true // 初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加
}))
// 应用中间件
app.use(bodyParser.json()) // json格式 // 以下这段代码 如果没有 后台将接收不到前台代码
app.use(bodyParser.urlencoded({ extended: false })) // formData  parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'upload'))); // 默认静态资源路径  展示存放图片

// 这里把app 传过去
userRouter(app, path)
var port = process.env.PORT || 3000
// var port = 80
var server = app.listen(port, function () {
  console.log(`node start: http://localhost:${port}`)
})