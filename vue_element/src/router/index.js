import Vue from 'vue'
import Router from 'vue-router'
import Module from '../page/module'

Vue.use(Router)

/**
 * hidden: true 不会显示在侧边栏
 */
export default new Router({
  routes: [
    {
      path: '/login', name: 'login', hidden: true, component: Module.Login
    },
    {
      path: '/register', name: 'register', hidden: true, component: Module.Register
    },
    {
      path: '/home', name: 'home', hidden: true, component: Module.Home
    },
    {
      path: '/', name: 'module', component: Module.Home, iconCls: 'el-icon-star-on',
      children: [
        {
          path: '/map',
          name: 'map',
          component: Module.Map,
        },
        {
          path: '/calendar',
          name: 'calendar',
          component: Module.Calendar,
        },
        {
          path: 'cutting',
          name: 'cutting',
          component: Module.Cutting
        },
        // {
        //   path: '/picker',
        //   name: '日期选择',
        //   component: Module.Picker
        // }
      ]
    },
    {
      path: '/', 
      name: 'picture',
      leaf: true,//只有一个节点
      component: Module.Home, 
      iconCls: 'el-icon-picture-outline',
      children: [
        { path: '/picture', component: Module.Picture, name: 'picture' }
      ]
    },
    {
      path: '/', 
      name: 'ueditor',
      leaf: true,//只有一个节点
      component: Module.Home,   
      iconCls: 'el-icon-tickets',
      children: [
        { path: '/ueditor', component: Module.Ueditor, name: 'ueditor' }
      ]
    },
    {
      path: '/', 
      name: 'table',
      leaf: true,//只有一个节点
      component: Module.Home,   
      iconCls: 'el-icon-share',
      children: [
        { path: '/table', component: Module.Table, name: 'table' }
      ]
    },
    {
      path: '/', 
      name: 'table_edit',
      leaf: true,//只有一个节点
      component: Module.Home,   
      iconCls: 'el-icon-edit-outline',
      children: [
        { path: '/tableEdit', component: Module.TableEdit, name: 'table_edit' }
      ]
    },
    {
      path: '/', 
      name: 'info',
      leaf: true,//只有一个节点
      component: Module.Home,   
      iconCls: 'el-icon-loading',
      children: [
        { path: '/personal', component: Module.Personal, name: 'info' }
      ]
    },
    { path: '/phone', hidden: true, component: Module.Phone },
    { path: '*', hidden: true, component: Module.Error }
  ]
})
