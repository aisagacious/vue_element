var mongoose = require('mongoose')

// 用户模型
var models = {
    table_edit: {
      'name': { type: String, require: true },
      'age': { type: String, require: true },
      'sex': { type: String, require: true },
      'introduce': { type: String, require: true },
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