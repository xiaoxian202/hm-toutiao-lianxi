<template>
  <div class="my-image">
      <!-- 图片按钮 -->
      <div class="btn-img" @click="openDialog">
          <!-- 如果有接到的值就用接到的图片，如果没有就显示默认图片 -->
          <img :src="value || previewImg" alt="">
      </div>
      <!-- 对话框 -->
      <el-dialog :visible.sync="dialogVisible" width="720px">
        <!-- tabs选项卡 -->
        <!-- v-model="activeName":激活选项卡name的属性 -->
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="素材库" name="images">
                <!-- 按钮 -->
                <el-radio-group v-model="reqParams.collect" size="small" @change="toggleList">
                    <el-radio-button :label="false">全部</el-radio-button>
                    <el-radio-button :label="true">收藏</el-radio-button>
                </el-radio-group>
                <!-- 图片列表 -->
                <div class="img-list">
                    <div @click="selectedImg(item.url)" :class="{'selected':selectedImgUrl===item.url}" class="img-item" v-for="item in images" :key="item.id">
                        <img :src="item.url" alt="">
                    </div>
                </div>
                <!-- 分页 -->
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="reqParams.per_page"
                    :current-page="reqParams.page"
                    @current-change="changePager">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="上传图片" name="upload">
                <!-- 上传图片 -->
                <el-upload
                    class="avatar-uploader"
                    action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                    name="image"
                    :headers="headers"
                    :show-file-list="false"
                    :on-success="uploadSuccess">
                    <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmImg">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
// 导入auth
import auth from '@/utils/auth.js'
// 导入图片预览图
// 动态绑定的src对应的数据字段的图片，没有打包到预览服务器，所以无法预览
import img from '../assets/default.png'
export default {
    name:'my-image',
    // 接值
    props:['value'],
    data() {
        return {
            dialogVisible:false,
            // 默认激活选项卡
            activeName:"images",
            reqParams:{
                collect:false,
                // 页码
                page:1,
                // 每页数量
                per_page:8
            },
            // 素材列表
            images:[],
            // 总条数
            total:0,
            // 当前选中的图片地址
            selectedImgUrl:null,
            // 当前上传的图片地址
            uploadImgUrl:null,
            // 请求头
            headers:{Authorization:`Bearer ${auth.getUser().token}`},
            // 图片预览图
            previewImg:img
        }
    },
    methods:{
        // 打开对话框
        openDialog() {
            this.dialogVisible = true
            this.getImages()
            // 清除对话框中内容
            this.selectedImgUrl = null
            this.uploadImgUrl = null
            this.activeName = "images"
        },
        // 获取图片素材
        async getImages() {
            const res = await this.$http.get('user/images',{
                params:this.reqParams
            })
            this.images = res.data.data.results
            this.total = res.data.data.total_count

        },
        // 页码变化的时候触发
        changePager(newPage) {
            this.reqParams.page = newPage
            this.getImages()
        },
        // 点击全部收藏按钮
        toggleList() {
            this.reqParams.page = 1
            this.getImages()
        },
        // 记录点击图片
        selectedImg(url) {
            this.selectedImgUrl = url
        },
        // 上传成功的回调函数
        uploadSuccess(response) {
            this.uploadImgUrl = response.data.url
        },
        // 点击确定按钮
        confirmImg() {
            // 点击的是素材库
            if(this.activeName === "images"){
                // 判断当前是否有选中一张图片，没有提示
                if(!this.selectedImgUrl) return this.$message.warning('请选中一张图片')
                // 预览
                // this.previewImg = this.selectedImgUrl
                // 把选中图片传到给父组件使用
                this.$emit('input',this.selectedImgUrl)
            }else {
                // 点击上传图片
                // 判断当前是否有上传一张图片，没有提示
                if(!this. uploadImgUrl) return this.$message.warning('请上传一张图片')
                // 预览
                // this.previewImg = this. uploadImgUrl
                // 把上传图片传到给父组件使用
                this.$emit('input',this. uploadImgUrl)
            }
            // 关闭对话框
            this.dialogVisible = false
            // 触发自定义事件，进行封面校验
            this.$emit('confirm')
        }
    }
}
</script>

<style lang="less" scoped>
.my-image {
    display: inline-block;
    margin-right: 20px;
    .btn-img {
        width: 150px;
        height: 150px;
        border: 1px dashed #ddd;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}
// 图片列表
.img-list {
    margin-top: 15px;
    .img-item {
        width: 150px;
        height: 120px;
        border: 1px dashed #ddd;
        display: inline-block;
        margin-right: 15px;
        position: relative;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
        &.selected::after{
            content:"";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.3) url('../assets/selected.png') no-repeat center /50px auto;
        }
    }
}
// 按钮
::v-deep .el-dialog__body {
    padding-bottom: 0px;
}
</style>