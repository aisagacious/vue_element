/**
 * 分页数据
 * @param {String} pagenum 页码
 * @param {String} rowsnum 单页数据
 * @param {String} db 当前的数据库名称
 * @param {*} 成功后的参数
 */
module.exports = function (pagenum, rowsnum, db, res) {
    // ⚠️  page rows 是前端传的值 数据库接受的是 Number
    var page = Number(pagenum)
    var rows = Number(rowsnum)
    if (db) {
        db.find({}, function (err, docs) {
            if (err) throw err
            db.find({}, function (err1, result) {
                if (err1) throw err1
                res.json({ rows: docs, total: result.length })
            })
        }).skip((page - 1) * rows).limit(rows)
    }
}

