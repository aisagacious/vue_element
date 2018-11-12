// 同步
import Cookies from 'js-cookie'
import * as types from './mutations-types'
export default {
  [types.SET_LANGUAGE](state, language) { // 设置语言
    state.language = language
    Cookies.set('language', language)
  },
  [types.USERINFO](state, userinfo) { // 用户信息
    state.userinfo = userinfo
    Cookies.set('userInfo', userinfo)
    // 解析后的数据 更改页面头像 名称
    let jsonUser = JSON.parse(Cookies.get('userInfo'))

    // 解决头像 名称不变问题 通过cookie 来保持同步 vuex刷新页面会丢失数据
    Cookies.set('user', jsonUser.data.user)
    Cookies.set('avatar', jsonUser.data.avatar)
    state.isUser = {
      user: Cookies.get('user'),
      avatar: Cookies.get('avatar')
    }
  }
}