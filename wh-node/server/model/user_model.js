var mongoose = require('mongoose')

// 用户模型
var models = {
  user: {
    // 用户名称
    'user': { type: String, require: true },
    'pwd': { type: String, require: true },
    'type': { type: String, default: 'ordinaryUser' },  // 默认是普通用户
    'avatar': { type: String, default: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2297581999,360436467&fm=27&gp=0.jpg' },
    'name': { type: String, default: '我的名字' }, // 默认显示用户名 user  如果name有值使用name
    'description': { type: String, default: '我的描述' }
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