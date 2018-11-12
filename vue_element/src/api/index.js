/**
 *  公共api接口
 */
import Api from '../config';

export default {
  //  eg:
  API_EG: `${Api}/commonFoot/footInfo.json?_format_=json`,
  API_REGISTER: `${Api}/user/register`, // 注册接口
  API_LOGIN: `${Api}/user/login`, // 登录接口
  API_UPLOAD: `${Api}/user/upload`,  // 上传图片
  API_UPLOAD_LIST: `${Api}/user/upload/list`, // 获取图片
  API_UPLOAD_PAGELIST: `${Api}/user/upload/pagelist`,  // 获取图片分页数据
  API_UEDITOR_SACVE: `${Api}/user/ueditor/save`,  // 保存文章信息
  API_ARTICLE_LIST: `${Api}/user/article/list`, // 获取文章列表 
  API_UPLOAD_DELETE: `${Api}/user/upload/delete`, // 删除图片接口
  API_GET_VERIFCODE: `${Api}/user/verifcode`, // 获取图片验证码user/verifcode
  API_USER_PERSINFO: `${Api}/user/persinfo`, // 修改个人信息
  API_ADD_TABLE_DATA: `${Api}/user/addTableData`, // 表格编辑 新增数据
  API_GET_TABLE_DATA: `${Api}/user/getTableData`,  // 表格编辑 获取分页数据
  API_UPDATE_TABLE:`${Api}/user/updateTable`, // 表格编辑 更新数据
  API_DELETE_TABLE: `${Api}/user/deleteTable`  // 表格编辑 删除数据
}