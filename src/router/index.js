import Vue from 'vue'
//导入vue-router
import VueRouter from 'vue-router'
//注册
Vue.use(VueRouter)

//导入登录组件
import Login from '@/views/login'

//初始化路由
const routes = [
    {
        path:'/login',
        component:Login
    }
]
const router = new VueRouter({
    routes
})

//导出
export default router
