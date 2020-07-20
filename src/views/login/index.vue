<template>
    <div class="container-login">
        <el-card>
            <img src="../../assets/logo_index.png" alt="">
            <!-- status-icon:效验结果的反馈图标 -->
            <el-form :model="loginForm" :rules="ruleForm" ref="loginForm" status-icon>
                <el-form-item prop="mobile">
                    <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input style="width:240px;margin-right:8px" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item >
                    <!--:value="true" 默认选中  -->
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item >
                    <el-button style="width:100%" type="primary" @click="recode">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        
    </div>
</template>

<script>
// 导入本地用户信息相关函数
import auth from '@/utils/auth.js'

// vue配置对象中的name属性:
// 当你的组件时路由级别组件的时候，默认的组件名称 文件的名称，
// 目前组件的名称不够语义化，所以给组件设置一个name属性，
// 在vue-devtools查看组件的时候，根据name属性的值来查看即可
export default {
    name:'page-login',
    data() {
        // 自定义验证规则
        const checkMobile = (rule,value,callback) => {
            //第一位是1，第二位3-9，后面有9位数结尾
            if(/^1[3-9]\d{9}$/.test(value)) {
                callback()
            }else {
                callback(new Error('手机号不正确'))
            }
        }
        return {
            //表单数据对象
           loginForm:{
               mobile:'',
               code:''
           },
           //表单验证规格对象
           ruleForm:{
               mobile:[
                   { required: true, message: '请填写手机号', trigger: 'blur' },
                   //自定义验证规则
                    {validator:checkMobile, trigger: 'blur'}
               ],
               code:[
                   { required: true, message: '请填写验证码', trigger: 'blur' },
                   { len:6, message: '请输入6位验证码', trigger: 'blur' }

               ]
           }
        }
    },
    methods:{
        recode() {
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    // //登录
                    // this.$http.post('authorizations',this.loginForm)
                    // .then((res) => {
                    //     // 成功，保存用户信息
                    //     // res.data是全部信息
                    //     auth.setUser(res.data.data)
                    //     //登陆成功，跳转路由
                    //     // console.log(res.data);
                    //     this.$router.push({
                    //         path:'/'
                    //     })
                    // })
                    // .catch((err) => {
                    //     //登陆失败，提示
                    //     console.log(err);
                    //     this.$message.error('手机号或验证码错误');
                    // })
                    // ----------------------------------------------

                    // async和await使用
                    // 使用 try{  可能报错的代码片段  }catch(e){  对异常进行处理代码  } 异常捕获和异常处理
                    try {
                        // 考虑异常
                        const res = await this.$http.post('authorizations',this.loginForm)
                        auth.setUser(res.data.data)
                        this.$router.push('/')
                    } catch (error) {
                        this.$message.error('手机号或验证码错误');
                    }
                }
            })
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