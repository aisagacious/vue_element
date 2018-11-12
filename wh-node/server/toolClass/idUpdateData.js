/**
 * 根据id 更新数据
 * @param {String} db 当前的数据库名称
 * @param {Object}  all 更新的数据
 * @param {String} res 返回值
 */

module.exports = function (db, all = {}, res) {
  /**
   * MongoDB 比较运算符
   * $eq = (等于)
   * $gt > (大于)
   * $gte >= (大于等于)
   * $lt < (小于)
   * $lte <= (小于等于)
   * $ne != (不等于)
   * $in in (in)
   * $nin !in (not in)
   */
  db.findByIdAndUpdate(all._id, all, function (err, result) {
    if (err) throw err
    if (result) {
      res.send({ code: 0, msg: '修改成功' })
    } else {
      res.send({ code: 1, msg: '修改失败' })
    }
  })
}
