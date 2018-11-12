var utils = require('utility') // md5加密
var ObjectID = require('mongodb').ObjectID // mogodb的ObjectId对象 查询数据使用
var svgCaptcha = require('../toolClass/svgCaptcha') // 生成图片验证码
// var httpPort = 'http://lurenhong.top:80/'
var httpPort = 'http://localhost:3000/'

// 用户模型
var userModel = require('../model/user_model')
var uploadModels = require('../model/upload_model')
var articleModels = require('../model/article_model')
var tableEditModels = require('../model/table_edit_model')

var User = userModel.getModel('user')
var UserImage = uploadModels.getModel('image')
var userArticle = articleModels.getModel('article')
var userTableEdit = tableEditModels.getModel('table_edit')

// 工具类
var upload = require('../toolClass/uploadFile') // 图片上传
var pagingData = require('../toolClass/pagingData') // 分页
var addData = require('../toolClass/addData') // 添加
var inquireAllData = require('../toolClass/inquireAllData') // 查找
var removeData = require('../toolClass/removeData') // 删除
var idUpdateData = require('../toolClass/idUpdateData') // 更新

// 默认插入2条数据做权限校验
// 定义filter
var _filter = { 'pwd': 0, '_v': 0 }

var isDev = (process.env.NODE_ENV == 'development')

// 密码加密处理
var md5Pwd = function (pwd) {
  var salt = 'wh-love-I!@LOVEYOU~!!'
  return utils.md5(utils.md5(pwd + salt))
}
/**
 * 
 * @param {*} app Router 对象
 * @param {*} path 路径node提供的
 */
module.exports = function (app, path) {
  app.get('/', function (req, res) {
    res.redirect('/dist/index.html');
    res.end()
  })
  // 注册
  app.post('/user/register', function (req, res) {
    // 这里过滤验证码 前端进行校验即可
    var { user, pwd } = req.body
    User.findOne({ user }, function (err, doc) {
      if (doc) {
        return res.json({ code: 1, msg: '该手机号注册过了' })
      }
      var userModel1 = new User({ user, pwd: md5Pwd(pwd) })
      userModel1.save(function (e, d) {
        if (e) {
          return res.json({ code: 1, msg: '后台出错了' })
        }
        var { user, _id } = d
        res.cookie('userids', _id)
        return res.json({ code: 0, data: { user, _id }, msg: '注册成功!' })
      })
    })
  })
  // 获取验证码 
  app.get('/user/verifcode', function (req, res) {
    svgCaptcha(req, res)
  })

  // 用户登录
  app.post('/user/login', function (req, res) {
    // req.session.captcha  // undefined 因为vue-cli的proxyTable 发送网络请求的问题
    var { user, pwd } = req.body

    User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function (err, doc) {

      if (!doc) {
        return res.json({ code: 1, msg: '用户名或密码错误' })
      }
      // 把用户的id保存在cookie中
      res.cookie('userids', doc._id)
      return res.json({ code: 0, data: doc })
    })
  })

  // 上传图片
  app.post('/user/upload', upload('1').single('img'), function (req, res) {
    if (req.file) {
      var result = {
        img: httpPort + 'beauty/' + req.file.filename
      }
      addData(UserImage, result, function () {
        res.send({ code: 0, msg: '上传图片成功' })
      })
    } else {
      res.send({ code: 1, msg: '请选择图片上传' })
    }
  })

  // 获取图片信息
  app.get('/user/upload/list', function (req, res) {
    // {_id: ObjectID('5b87b08e7a820e413844125f')} _id 查询
    inquireAllData(UserImage, {}, function (data) {
      res.json({ code: 0, data: data })
    })
  })

  // 获取图片信息 分页查询
  app.post('/user/upload/pagelist', function (req, res) { // 实现分页查询
    var page = req.body.page
    var rows = req.body.rows
    if (UserImage) {
      pagingData(page, rows, UserImage, res)
    }
  })

  // 根据图片Id删除对应的图片
  app.get('/user/upload/delete', function (req, res) {
    removeData(UserImage, { _id: ObjectID(req.query['_id']) }, 1, function (result) {
      res.send({ code: 0, msg: '删除成功' })
    })
  })

  // 富文本编辑器中上传图片
  app.post('/user/ueditor', upload('2').single('img'), function (req, res) {
    if (req.file) {
      var result = {
        img: httpPort + 'ueditor/' + req.file.filename
      }
      addData(UserImage, result, function () {
        res.send({ code: 0, data: result, msg: '上传图片成功' })
      })
    } else {
      res.send({ code: 1, msg: '请选择图片上传' })
    }
  })

  // 上传保存文章信息 标题 首图 富文本信息
  app.post('/user/ueditor/save', upload('2').single('img'), function (req, res) {
    if (req.file) {
      var ueditorRes = {
        img: httpPort + 'ueditor/' + req.file.filename,
        title: req.body.title,
        content: req.body.content,
        time: req.body.time
      }
      addData(userArticle, ueditorRes, function () {
        res.send({ code: 0, data: '', msg: '保存信息成功' })
      })
    } else {
      res.send({ code: 1, msg: '请选择图片上传' })
    }
  })

  // 获取文章列表
  app.post('/user/article/list', function (req, res) {
    var page1 = req.body.page
    var rows1 = req.body.rows
    if (userArticle) {
      pagingData(page1, rows1, userArticle, res)
    }
  })

  // 修改个人信息
  app.post('/user/persinfo', upload('3').single('avatar'), function (req, res) {
    // 如果图片没有被修改 不做任何操作 图片被修改 删除文件夹原有图片
    if (!req.body.avatar) {
      removeData(User, { _id: ObjectID(req.body._id) }, 2, function (result) {
        res.send({ code: 0, msg: '删除成功' })
      })
    }

    var avatar = {
      name: req.body.name,
      description: req.body.description,
      avatar: req.body.avatar ? req.body.avatar : httpPort + 'avatar/' + req.file.filename,
    }
    // 根据id 更新数据 并查出最新数据
    User.findByIdAndUpdate(req.body._id, avatar, function (err, doc) {
      if (err) throw err
      if (doc) {
        // 新增成功后 在吧当前的数据查询出来
        User.findOne({ _id: ObjectID(req.body._id) }, function (err1, doc1) {
          if (err1) throw err1
          res.json({ code: 0, data: doc1, msg: '修改成功' })
        })
      }
    })
  })

  // 表格编辑 新增数据
  app.post('/user/addTableData', function (req, res) {
    var addTable = {
      name: req.body.name,
      age: req.body.age,
      sex: req.body.sex,
      introduce: req.body.introduce
    }
    addData(userTableEdit, addTable, function () {
      res.send({ code: 0, msg: '新增数据成功' })
    })
  })

  // 表格编辑 查询数据
  app.post('/user/getTableData', function (req, res) {
    var tablePage = req.body.page
    var tableRows = req.body.rows
    if (userTableEdit) {
      pagingData(tablePage, tableRows, userTableEdit, res)
    }
  })

  // 表格编辑 编辑更新数据
  app.post('/user/updateTable', function (req, res) {
    idUpdateData(userTableEdit, req.body, res)
  })

  // 表格编辑 删除数据
  app.get('/user/deleteTable', function (req, res) {
    removeData(userTableEdit, { _id: ObjectID(req.query['_id']) }, 'Y', function (data) {
      if (data) {
        res.send({ code: 0, msg: '删除数据成功' })
      } else {
        res.send({ code: 1, msg: '删除数据失败' })
      }
    })
  })
}
