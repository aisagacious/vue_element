//  异步操作
import * as types from './mutations-types'
import Http from '../utils/http'
import Api from '../api/index'

export default {
  setLanguage({ commit }, language) { // 设置语言
    commit(types.SET_LANGUAGE, language)
  },
  registerInfo({ commit }, data) { // 注册账号
    return Http.post(Api.API_REGISTER, data)
  },
  loginUserInfo({ commit }, userinfo) { // 登录状态
    // 这里使用Promise 保存了登陆状态 如果直接return Http.post .vue页面使用commit 变得复杂化
    return new Promise((resolve, reject) => {
      return Http.post(Api.API_LOGIN, userinfo).then(res => {
        if (res.code == 0) {
          commit(types.USERINFO, JSON.stringify(res))
        }
        resolve(res)
      })
    })
  },
  uploadFile({ commit }, data) {  // 上传图片裁剪
    return Http.upload(Api.API_UPLOAD, data)
  },
  uploadList({ commit }, data) { // 获取所有图片
    return Http.get(Api.API_UPLOAD_LIST, data)
  },
  getUploadPageList({ commit }, data) { // 获取图片分页数据
    return Http.post(Api.API_UPLOAD_PAGELIST, data)
  },
  saveUeditor({ commit }, data) {  // 保存文章数据
    return Http.upload(Api.API_UEDITOR_SACVE, data)
  },
  getArticle({ commit }, data) {  // 获取文章数据展示在表格中
    return Http.post(Api.API_ARTICLE_LIST, data)
  },
  deletePicture({ commit }, data) { // 删除图片
    return Http.get(Api.API_UPLOAD_DELETE, data)
  },
  getVerifcode({ commit }, data) { // 获取图片验证码
    return Http.get(Api.API_GET_VERIFCODE, data)
  },
  editPersInfo({ commit }, data) { // 修改个人信息
    return new Promise((resolve, reject) => {
      return Http.upload(Api.API_USER_PERSINFO, data).then(res => {
        if (res.code == 0) {
          commit(types.USERINFO, JSON.stringify(res))
        }
        resolve(res)
      })
    })
  },
  addTableData({ commit }, data) { // 表格编辑 新增数据
    return Http.post(Api.API_ADD_TABLE_DATA, data)
  },
  getTableData({ commit }, data) {  // 表格编辑 获取分页数据
    return Http.post(Api.API_GET_TABLE_DATA, data)
  },
  getUpdateTable({ commit }, data) { // 表格编辑 更新数据
    return Http.post(Api.API_UPDATE_TABLE, data)
  },
  deleteTable({ commit }, data) { // 表格编辑 删除数据
    return Http.get(Api.API_DELETE_TABLE, data)
  }
}