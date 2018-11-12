import Cookies from 'js-cookie'

// 定义初始状态
export default {
  login: false,
  language: Cookies.get('language') || 'en', // 获取当前语言
  userinfo: Cookies.get('userInfo') || null, // 获取用户信息
  isUser: { // 用户头像 名称
    user: Cookies.get('user') ? Cookies.get('user') : '',
    avatar: Cookies.get('avatar') ? Cookies.get('avatar') : ''
  }
}