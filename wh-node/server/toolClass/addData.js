/**
 * 封装新增数据的方法
 * @param {String} db 当前的数据库名称
 * @param {Object}  addobj 新增的数据
 * @param {Function} callback 回调取值
 */

module.exports = function (db, addobj, callback) {
    db.create(addobj, function (err, result) {
        if (err) throw err
        callback(result)
    })
}
