<template>
    <div class="container-login">
        <el-card>
            <img src="../../assets/logo_index.png" alt="">
            <el-form>
                <el-form-item >
                    <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-input style="width:240px;margin-right:8px" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item >
                    <!--:value="true" 默认选中  -->
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item >
                    <el-button style="width:100%" type="primary">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        
    </div>
</template>

<script>
// vue配置对象中的name属性:
// 当你的组件时路由级别组件的时候，默认的组件名称 文件的名称，
// 目前组件的名称不够语义化，所以给组件设置一个name属性，
// 在vue-devtools查看组件的时候，根据name属性的值来查看即可
export default {
    name:'page-login',
    data() {
        return {
           loginForm:{
               mobile:'',
               code:''
           } 
        }
    }
}
</script>

<style lang="less" scoped>
    .container-login {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url(../../assets/login_bg.jpg) no-repeat center /cover;
        // el-card 是组件，解析后并不存在el-card标签，所以标签选择器不好使
        // element-ui 在组件的根容器上，加了一个和组件名称一致的类名
        .el-card {
            width: 400px;
            height: 350px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            img{
                display: block;
                width: 200px;
                margin: 0 auto 20px;
            }
        }
    }
</style>