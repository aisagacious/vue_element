/**
 * 封装删除数据的方法
 * @param {String} db 当前的数据库名称
 * @param {Object}  removeObj 插入的数据
 * @param {String} type 1删除图片 2 修改头像把之前的图片从文件中删除  Y删除数据库中数据
 * @param {Function} callback 回调取值
 */
module.exports = function (db, removeObj, type, callback) {
  var deleteFile = require('../toolClass/deleteFiles')
  var index, imgName

  // 新增特殊参数 type = Y 删除数据 不做任何特殊处理
  if (type === 'Y') {
    db.remove(removeObj, function(err, doc) {
      if (err) throw err
      callback(doc)
    })
    return false
  }

  db.findOne(removeObj, function (err, doc) {
    if (err) throw err
    if (type == 1) { // 从最后一个/ 查找 获取图片名称
      index = doc.img.lastIndexOf('/')
      imgName = doc.img.substring(index + 1, doc.length)
      db.remove(removeObj, function (err1, result) {
        if (err1) throw err1
        if (result) {
          // 删除本地文件夹图片
          deleteFile('upload/beauty', imgName, 1)
          callback(result)
        }
      })
    } else {
      index = doc.avatar.lastIndexOf('/')
      imgName = doc.avatar.substring(index + 1, doc.length)
      deleteFile('upload/avatar', imgName, 1)
    }
  })
}
