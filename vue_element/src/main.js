import Vue from 'vue'
import App from './App'
import 'babel-polyfill' // IE打开空白问题
import router from './router'
import Element from 'element-ui'
import Croppa from 'vue-croppa'
import Cookies from 'js-cookie'
// import VuePreview from 'vue-preview'
import vuePicturePreview from 'vue-picture-preview'
import store from './vuex/index'
import i18n from './lang'
import 'vue-croppa/dist/vue-croppa.css'
import './assets/css/reset.css'


Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// Vue.use(VuePreview)
Vue.use(vuePicturePreview)
Vue.use(Croppa)


// Croppa 参考：https://zhanziyang.github.io/vue-croppa/#/quick-start
// 路由拦截
router.beforeEach((to, from, next) => {
  let user = Cookies.get('userInfo')
  if (to.path === '/login') {
    Cookies.remove('userInfo')
  }
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
