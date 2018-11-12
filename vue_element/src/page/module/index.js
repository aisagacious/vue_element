/**
 * wh
 * 2018-08-07
 */

// 路由懒加载
export default {
  HelloWorld: (resolve) => {
    import('@/components/HelloWorld').then((module) => {
      resolve(module)
    })
  },
  Login: (resolve) => { // 登录
    import('@/page/login/login').then((module) => {
      resolve(module)
    })
  },
  Home: (resolve) => { // 首页
    import('@/page/home').then((module) => {
      resolve(module)
    })
  },
  Map: (resolve) => { // 地图
    import('@/page/map/map').then((module) => {
      resolve(module)
    })
  },
  Error: (resolve) => { // 404
    import('@/page/404').then((module) => {
      resolve(module)
    })
  },
  Calendar: (resolve) => { // 日历
    import('@/page/calendar/calendar').then((module) => {
      resolve(module)
    })
  },
  Picture: (resolve) => { // 美图
    import('@/page/picture/picture').then((module) => {
      resolve(module)
    })
  },
  Cutting: (resolve) => { // 上传图片裁剪
    import('@/page/picture/picture-cutting').then((module) => {
      resolve(module)
    })
  },
  Ueditor: (resolve) => { // 富文本编辑器
    import('@/page/ueditor/ueditor').then((module) => {
      resolve(module)
    })
  },
  Phone: (resolve) => { // Phone 预览
    import('@/page/phone/phone').then((module) => {
      resolve(module)
    })
  },
  Table: (resolve) => { // Table 表格
    import('@/page/table/table').then((module) => {
      resolve(module)
    })
  },
  Register: (resolve) => { // 注册页面
    import('@/page/login/register').then((module) => {
      resolve(module)
    })
  },
  Personal: (resolve) => { // 注册页面
    import('@/page/personal/personal').then((module) => {
      resolve(module)
    })
  },
  Picker: (resolve) => { // 日期选择
    import('@/page/picker/picker').then((module) => {
      resolve(module)
    })
  },
  TableEdit: (resolve) => { // 表格编辑
    import('@/page/table/table-edit.vue').then((module) => {
      resolve(module)
    })
  }
}