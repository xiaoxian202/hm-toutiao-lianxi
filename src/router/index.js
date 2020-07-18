import Vue from 'vue'
//导入vue-router
import VueRouter from 'vue-router'
//注册
Vue.use(VueRouter)
// 导入本地用户信息
import auth from '@/utils/auth.js'

//导入登录组件
import Login from '@/views/login'
//首页
import Layout from '@/views/layout'
//首页下欢迎页
import Welcome from '@/views/Welcome'
// 404
import NoFound from '@/views/404'
// 内容管理
import Article from '@/views/article'

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
            },
            {
                path:'/article',
                component:Article
            }
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
