/**
 *  wh
 *  2018/08/30
 * @param {String} urlName 表名
 */
module.exports = function (urlName = 'vue-element') {

  // 链接mongo 并且使用这个集合
  const mongoose = require('mongoose')
  // 本地数据库地址
  const DB_URL = 'mongodb://127.0.0.1:27017'
  // 远程服务器地址
  // const DB_URL = 'mongodb://lurenhong.top:27017'

  mongoose.connect(DB_URL + '/' + urlName)
  
  // 数据库连接成功
  mongoose.connection.on('connected', function () {
    console.error('数据库连接成功:' + DB_URL)
  })

  // 数据库连接异常
  mongoose.connection.on('error', function (err) {
    console.error('数据库连接异常: ' + err)
  })
  
  // 数据库连接断开
  mongoose.connection.on('disconnected', function () {
    console.error('数据库连接断开' + DB_URL)
  })

}


