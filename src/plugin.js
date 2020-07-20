// 导入my-bread
import MyBread from '@/components/my-bread'
// 是一个基于Vue的插件，实现Vue的自定义功能
export default{
    //install函数默认有一个 Vue实例传参
    install(Vue) {
        Vue.component(MyBread.name,MyBread)
    }
}