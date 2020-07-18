import Vue from 'vue'
//导入vue-router
import VueRouter from 'vue-router'
//注册
Vue.use(VueRouter)

//导入登录组件
import Login from '@/views/login'
//首页
import Layout from '@/views/layout'
//首页下欢迎页
import Welcome from '@/views/Welcome'

//初始化路由
const routes = [
    {
        path:'/login',
        component:Login
    },
    {
        path:'/',
        component:Layout,
        children:[
            {
                path:'/',
                component:Welcome
            }
        ]
    }
]
const router = new VueRouter({
    routes
})

//导出
export default router
