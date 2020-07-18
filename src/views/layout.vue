<template>
    <el-container class="container-layout">
        <!-- 左侧边栏 -->
        <el-aside :width="isCollapse ? '200px' : '64px'" >
            <!-- logo -->
            <div class="logo" :class="{'mini_logo':!isCollapse}"></div>
            <!-- 导航栏 -->
            <!-- router是否使用 vue-router 的模式，
            启用该模式会在激活导航时以 index 作为 path 进行路由跳转.
            默认是false，不写就是false，写就是true -->
            <el-menu
                router
                :default-active="$route.path"
                background-color="#002233" 
                :collapse=!isCollapse 
                :collapse-transition = isCollapse
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="/">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/article">
                    <i class="el-icon-document"></i>
                    <span slot="title">内容管理</span>
                </el-menu-item>
                <el-menu-item index="/image">
                    <i class="el-icon-picture"></i>
                    <span slot="title">素材管理</span>
                </el-menu-item>
                <el-menu-item index="/publish">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">发布文章</span>
                </el-menu-item>
                <el-menu-item index="/comment">
                    <i class="el-icon-chat-dot-round"></i>
                    <span slot="title">评论管理</span>
                </el-menu-item>
                <el-menu-item index="/fans">
                    <i class="el-icon-present"></i>
                    <span slot="title">粉丝管理</span>
                </el-menu-item>
                <el-menu-item index="/setting">
                    <i class="el-icon-setting"></i>
                    <span slot="title">个人设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <!-- 右侧内容 -->
        <el-container>
            <!-- 头部 -->
            <el-header>
                <!-- 图标 -->
                <i class="icon" 
                @click="isCollapse = !isCollapse" 
                :class="{'el-icon-s-fold':isCollapse,'el-icon-s-unfold':!isCollapse}"></i>
                <!-- 文字 -->
                <span class="text">江苏传智播客科技教育有限公司</span>
                <!-- 头像 下拉列表-->
                <el-dropdown @command="clickItem">
                    <span>
                        <img :src="user.photo" alt="">
                        <!-- 用户名 -->
                        <span>{{user.name}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!--.native: 组件的根元素上直接监听一个原生事件 
                        @click.native="setting"  @click.native="logout"
                        -->
                        <el-dropdown-item command="setting" icon="el-icon-setting">个人设置</el-dropdown-item>
                        <el-dropdown-item command="logout" icon="el-icon-unlock">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <!-- 二级路由显示位置 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 导入用户信息相关函数
import auth from '@/utils/auth'
export default {
    name:'layout',
    data() {
        return {
            isCollapse:true,
            user:{
                name:'',
                photo:''
            }
        }
    },
    // 钩子函数，初始化的时候从本地拿出数据
    created() {
        const {name,photo} = auth.getUser()
        this.user = {name,photo}
    },
    methods:{
        setting() {
            // 跳转
            this.$router.push('/setting')
        },
        logout() {
            // 清除用户信息
            auth.delUser()
            // 跳转到登录页
            this.$router.push('/login')
        },
        // 点击任何一个下拉选项触发的函数
        // 注意：绑定该函数的时候不能带括号，因为需要接受默认传参
        clickItem(command) {
            // 需要知道当前点击是哪个选项，然后然后去做对应的业务
            // command是你点击选项，选项上command属性的值
            // 当你command=setting其实你调用setting函数
            // 当你command=logout其实你调用logout函数
            this[command]()
        }
    }
}
</script>

<style lang="less" scoped>
    .container-layout {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        .el-aside {
            background-color: #002233;
            .logo {
                width: 100%;
                height: 60px;
                background: #002244 url(../assets/logo_admin.png) no-repeat center /140px auto;
            }
            .mini_logo {
                background-image:url(../assets/logo_admin_01.png );
                background-size:36px auto ;
            }
        }
        .el-header {
            line-height: 60px;
            border-bottom: 1px solid #ddd;
            .icon {
                font-size: 24px;
                vertical-align: middle;
            }
            .text {
                vertical-align: middle;
                margin-left: 10px;
            }
            .el-dropdown {
                float: right;
                img {
                    width: 30px;
                    height: 30px;
                    vertical-align: middle;
                }
                span {
                    color: #333;
                    font-weight: 700;
                    margin-left: 5px;
                }
            }
        }
    }
</style>