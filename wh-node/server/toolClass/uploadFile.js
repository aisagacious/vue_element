/**
 * wh
 *  2018/08/30
 * @param {*} type  1 上传图片  2富文本图片
 */
module.exports = function(type) {
  var fs = require('fs') // fs 读取文件
  var multer = require('multer') // 上传图片
  
  var createFolder = function (folder) {
      try {
          fs.accessSync(folder)
      } catch (e) {
          fs.mkdirSync(folder)
      }
  }
  
  
  var uploadFolder = '' // 上传图片保存目录
  if (type == 1) {  // 图片列表
    uploadFolder = './upload/beauty'
  }else if(type == 2){ // 文章保存路径
    uploadFolder = './upload/ueditor'
  }else { // 修改用户头像
    uploadFolder = './upload/avatar'
  }
  
  createFolder(uploadFolder) // 是否创建文件夹
  
  var storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, uploadFolder)
      },
      filename: function (req, file, cb) {
          cb(null, file.originalname)
      }
  })
  
  var upload = multer({ storage: storage })
  return upload
}