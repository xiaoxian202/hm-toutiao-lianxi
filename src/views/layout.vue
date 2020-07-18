<template>
    <el-container class="container-layout">
        <!-- 左侧边栏 -->
        <el-aside :width="isCollapse ? '200px' : '64px'" >
            <!-- logo -->
            <div class="logo" :class="{'mini_logo':!isCollapse}"></div>
            <!-- 导航栏 -->
            <el-menu
                default-active="1"
                background-color="#002233" 
                :collapse=!isCollapse 
                :collapse-transition = isCollapse
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-document"></i>
                    <span slot="title">内容管理</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-picture"></i>
                    <span slot="title">素材管理</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">发布文章</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <i class="el-icon-chat-dot-round"></i>
                    <span slot="title">评论管理</span>
                </el-menu-item>
                <el-menu-item index="6">
                    <i class="el-icon-present"></i>
                    <span slot="title">粉丝管理</span>
                </el-menu-item>
                <el-menu-item index="7">
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
                <el-dropdown>
                    <span>
                        <img src="../assets/avatar.jpg" alt="">
                        <!-- 用户名 -->
                        <span>名字这么多</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
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
export default {
    name:'layout',
    data() {
        return {
            isCollapse:true
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