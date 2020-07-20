import Vue from 'vue'
import App from './App.vue'
//导入element-ui样式
import ElementUI from 'element-ui'
//导入element-ui组件库
import 'element-ui/lib/theme-chalk/index.css'
//注册
Vue.use(ElementUI)

//导入自己的路由模块
import router from '@/router'

//导入自己配置的axios
import Axios from '@/api'
//挂载全局
Vue.prototype.$http = Axios

// 导入自己的插件
import Myplugin from '@/plugin.js'
// 注册
Vue.use(Myplugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
