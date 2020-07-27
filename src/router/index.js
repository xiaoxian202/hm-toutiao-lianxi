import Vue from 'vue'
//导入vue-router
import VueRouter from 'vue-router'
//注册
Vue.use(VueRouter)
// 导入本地用户信息
import auth from '@/utils/auth.js'

//导入登录组件
const Login = () => import ('@/views/login') 
//首页
const Layout = () => import ('@/views/layout') 
//首页下欢迎页
const Welcome = () => import ('@/views/Welcome')
// 素材管理
const Image = () => import ('@/views/image') 
// 发布文章
const Publish = () => import ('@/views/publish') 
// 评论管理
const Comment = () => import ('@/views/comment') 
// 粉丝管理 命名
const Fans = () => import (/* webpackChunkName: "fans" */ '@/views/fans') 
// 个人设置
const Setting = () => import ('@/views/setting')
// 404
const NoFound = () => import ('@/views/404') 
// 内容管理
const Article = () => import ('@/views/article')
//初始化路由
const routes = [
    // 登录
    {
        path:'/login',
        component:Login
    },
    // 首页
    {
        path:'/',
        component:Layout,
        children:[
            // 欢迎页
            {
                path:'/',
                component:Welcome
            },
            // 内容管理
            {
                path:'/article',
                component:Article
            },
            // 素材管理
            {path:'/image',component:Image},
            // 发布文章
            {path:'/publish',component:Publish},
            // 评论管理
            {path:'/comment',component:Comment},
            // 粉丝管理
            {path:'/fans',component:Fans},
            // 个人设置
            {path:'/setting',component:Setting},
        ]
    },
    // 放到最后面
    {
        path:'*',
        component:NoFound
    }
]
const router = new VueRouter({
    routes
})

// 导航守卫
router.beforeEach((to,from,next) => {
    // to:目标路由对象
    // from:正要离开的路由对象
    // next()下一步放行，next('/地址')拦截，跳转到哪

    //获取本地用户信息
    const localUser = auth.getUser()
    // 如果访问登录页，有没有token就跳转到登录页
    if(to.path !== '/login' && !localUser.token) return next('/login')
    // 其他情况一律放行
    next()
})

//导出
export default router
