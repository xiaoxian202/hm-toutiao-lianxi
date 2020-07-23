<template>
  <div class="my-image">
      <!-- 图片按钮 -->
      <div class="btn-img" @click="openDialog">
          <img src="../assets/default.png" alt="">
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
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
// 导入auth
import auth from '@/utils/auth.js'
export default {
    name:'my-image',
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
            headers:{Authorization:`Bearer ${auth.getUser().token}`}
        }
    },
    methods:{
        // 打开对话框
        openDialog() {
            this.dialogVisible = true
            this.getImages()
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