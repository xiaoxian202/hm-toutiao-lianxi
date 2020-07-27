<template>
    <div class="container-setting">
       <el-card>
            <div slot="header">
                <my-bread>个人设置</my-bread>
            </div>
            <!-- element 栅格 24列 -->
            <el-row>
                <el-col :span="12">
                    <!-- 表单 -->
                    <el-form label-width="120px" :model="user">
                        <el-form-item label="编号：">{{user.id}}</el-form-item>
                        <el-form-item label="手机：">{{user.mobile}}</el-form-item>
                        <el-form-item label="媒体名称：">
                            <el-input placeholder="请输入媒体名称" v-model="user.name"></el-input>
                        </el-form-item>
                        <el-form-item label="媒体介绍：">
                            <el-input type="textarea" :rows="3" v-model="user.intro"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱：">
                            <el-input placeholder="请输入邮箱" v-model="user.email"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveSetting">保存设置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <!-- 上传 
                    el-upload默认上传方式post且不能修改-->
                    <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :http-request="uploadImage">
                        <img v-if="user.photo" :src="user.photo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
            </el-row>
       </el-card>
    </div>
</template>

<script>
// 导入eventBus
import eventBus from '@/eventBus.js'
// 导入auth
import auth from '@/utils/auth.js'
export default {
    name:'page-setting',
    data() {
        return {
            user:{
                name:'',
                // 头条号简介
                intro:'',
                // 用户头像
                photo:'',
                // 邮箱
                email:''
            },
        }
    },
    created() {
        this.getSetting()
    },
    methods:{
        // 获取个人信息
        async getSetting() {
            const {data:{data}} = await this.$http.get('user/profile',{params:this.user})
            this.user = data
        },
        // 点击保存对象
        async saveSetting() {
            // 异常
            try {
                const {name,intro,email} = this.user
                await this.$http.patch('user/profile',{name,intro,email})
                // 提示
                this.$message.success('保存设置成功')
                // 同步用户名称给Layout
                eventBus.$emit('saveName',name)
                // 同步用户名称给本地
                // 获取
                const loadName = auth.getUser()
                // 修改
                loadName.name = name
                // 保存
                auth.setUser(loadName)
            } catch (error) {
                this.$message.error('保存设置失败')
            }
        },
        // 头像上传的时候执行,
        async uploadImage({file}) {
            // console.log(infoObj);
            // file是图片文件对象
            // patch是对PUT方法的补充，用来对已知资源进行局部更新

            // 异常
            try {
                // 实例化formdata对象
                const fd = new FormData()
                fd.append('photo',file)
                const res = await this.$http.patch('user/photo',fd)
                // console.log(res);
                // 提示
                this.$message.success('修改头像成功')
                // 预览
                this.user.photo = res.data.data.photo
                // 同步到Layput头像
                eventBus.$emit('updateAvatar',this.user.photo)
                // 同步到本地
                const loadImage = auth.getUser()
                loadImage.photo =  this.user.photo
                auth.setUser(loadImage)
            } catch (error) {
                 this.$message.error('修改头像失败')
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>