/**
 * 通过图片名称匹配 删除文件夹下指定图片
 * @param {*} path 
 * @param {String} imgName 图片名称
 */
module.exports = function (path, imgName, type) {
  var fs = require('fs')   // 引入fs模块

  var files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path) // 读取指定目录下所有文件
    files.forEach(function (file, index) {
      var curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) { // 如果curPath表示的是一个目录则返回true
        // deleteall(curPath)
        return
      } else { // 删除文件
        // if (type == 1) { // type 为1 图片相等时 删除
          if (file == imgName) { // 这里我们通过数据库图片名字 与本地图片名字匹配 删除
            fs.unlinkSync(curPath)
          }
        // }else { // type 2 为上传头像 这里为了区分 删除目录下所以的文件 保留修改的
        //   if  (file != imgName) {
        //     fs.unlinkSync(curPath)
        //   }
        // }
      }
    })
    // fs.rmdirSync(path);
  }
}