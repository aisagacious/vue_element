
var svgCaptcha = require('svg-captcha')
/**
 * 生成图片验证码
 * @param {*} req
 * @param {*} res 
 */
module.exports = function (req, res) {
  
    var codeConfig = {
        size: 5,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 4, // 干扰线条的数量
        height: 36
    }

    // 创建验证码
    var captcha = svgCaptcha.create(codeConfig) 

    // session 存储验证码遇到问题 vue-cli的proxyTable转发了，接口是通过这个转发了，但captcha是img设置src直接访问，所以造成两个session了
    // req.session.captcha = captcha.text.toLowerCase() // session存储验证码

    res.setHeader('captcha', captcha.text.toLowerCase())
    var codeData = {
        img:captcha.data,
        code: captcha.text.toLowerCase() // 简单校验 前端做判断
    }
    // 这里 验证码为svg图片
    res.send(codeData)
}