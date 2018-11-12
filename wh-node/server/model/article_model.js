var mongoose = require('mongoose')

// 用户模型
var models = {
  article: {
    // 图片名称
    'time': { type: String, require: true },
    'img': { type: String, require: true },
    'title': { type: String, require: true },
    'content': { type: String, require: true }
  }
}

for (var m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}