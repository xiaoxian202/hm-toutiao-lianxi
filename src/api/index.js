// 导入
import Axios from 'axios'
// 导入本地用户信息
import auth from '@/utils/auth.js'
// 导入router实例
import router from '@/router'
// 导入json-bigint
import JSONbigint from 'json-bigint'

//1. 配置基准地址
Axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
//2. 配置请求头 -> 有问题，刷新页面才会重新执行，不刷新不执行
// Axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`

//3.把axios默认的json转换方式，改成json-bigint来进行转换
// 通过axios的配置，修改默认的转换方式
// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
// 再删除的时候会报错，删除时没有响应data===null
Axios.defaults.transformResponse = [function(data) {
    try {
        return JSONbigint.parse(data)
    } catch (error) {
        // 转换不成功时后台给什么数据，就返回什么数据
        return data
    }
}]

// 请求拦截器
Axios.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    // 当前函数在每次请求的时候都会执行
    // config是请求配置
    // axios要求返回config
    config.headers.Authorization = `Bearer ${auth.getUser().token}`
    return config
},err => Promise.reject(err))

// 响应拦截器 解决无效token
// response 和我们使用的 res 是同一个对象
// response.data 后台给你的数据
Axios.interceptors.response.use(res => res,err => {
    // 响应失败的时候执行，上一个函数处理逻辑报错异常也会执行这个函数
    // 响应状态码是401，清除本地用户信息，跳转到登录页
    if(err.response && err.response.status === 401) {
        auth.delUser()
        //编程式导航 this.$router.push('/login) this不是vue实例
        //$router是我们初始化router实例 
        //此模块导入路由实例，使用路由实例调用push函数即可
        router.push('/login')
    }
})

// 导出
export default Axios
