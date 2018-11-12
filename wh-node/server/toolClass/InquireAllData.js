/**
 * 封装查询全部数据 、或者单个数据的方法
 * @param {String} db 当前的数据库名称
 * @param {Object}  all 插入的数据
 * @param {Function} callback 回调取值
 */

module.exports = function (db, all = {}, callback) {
    if (Object.keys(all) == 0) { // 查询全部数据
        db.find(all, function (err, result) {
            if (err) throw err
            callback(result)
        })
    }else { // 查询指定数据 可根据id查找
        db.findOne(all, function (err, result) {
            if (err) throw err
            callback(result)
        })
    }
}
