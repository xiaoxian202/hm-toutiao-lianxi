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
                    <el-form label-width="120px">
                        <el-form-item label="编号：">1</el-form-item>
                        <el-form-item label="手机：">13911111111</el-form-item>
                        <el-form-item label="媒体名称：">
                            <el-input placeholder="请输入媒体名称"></el-input>
                        </el-form-item>
                        <el-form-item label="媒体介绍：">
                            <el-input type="textarea" :rows="3"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱：">
                            <el-input placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">保存设置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <!-- 上传 -->
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
            </el-row>
       </el-card>
    </div>
</template>

<script>
export default {
    name:'page-setting',
    data() {
        return {
            // 上传图片地址
            imageUrl:''
        }
    }
}
</script>

<style lang="less" scoped>

</style>