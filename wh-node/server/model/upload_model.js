var mongoose = require('mongoose')

// 用户模型
var models = {
    image: {
        // 图片名称
        'img': { type: String, require: true },
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