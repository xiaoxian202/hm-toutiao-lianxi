<template>
  <div class="container-image">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
          <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div class="btn-box">
          <el-radio-group v-model="reqParams.collect" size="small" @change="toggleList">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <el-button @click="addImage" type="success" size="small" style="float:right">添加素材</el-button>
      </div>
      <!-- 图片列表 自己实现样式 -->
      <div class="img-box">
          <div class="img-item" v-for="item in images" :key="item.id">
              <img :src="item.url" alt="">
              <div class="img-icon">
                  <span @click="toggleStatus(item)" class="el-icon-star-off" :class="{'red':item.is_collected}"></span>
                  <span @click="delImage(item.id)" class="el-icon-delete-solid"></span>
              </div>
          </div>
      </div>   
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :per-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePage">
      </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog
        title="添加素材"
        :visible.sync="dialogVisible"
        width="30%">
        <!-- 图片素材上传 -->
        <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            name="image"
            :on-success="uploadSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-dialog>
  </div>
</template>

<script>
// 导入auth
import auth from '@/utils/auth.js'
export default {
    name:'page-image',
    data() {
        return{
            reqParams:{
                // 是否收藏,true查询收藏图片 false查询全部图片
                collect:false,
                // 当前页数
                page:1,
                 // 每页数量
                per_page:10
            },
            // 素材列表
            images:[],
            // 图片总数
            total:0,
            // 是否显示对话框
            dialogVisible:false,
            // 预览图的地址
            imageUrl:'',
            // 设置上传的请求头部
            headers:{Authorization:`Bearer ${auth.getUser().token}`}
        }
    },
    created() {
        this.getImage()
    },
    methods:{
        // 上传成功的钩子
        // response:后台返回的数据
        uploadSuccess(response) {
            // 提示+预览
            this.$message.success('上传素材成功')
            this.imageUrl = response.data.url
            // 3s后关闭弹框
            window.setTimeout(() => {
                this.dialogVisible = false
                this.getImage()
            },3000)
        },
        // 获取用户图片素材
        async getImage() {
            const res = await this.$http.get('user/images',{params:this.reqParams})
            // console.log(res.data);  
            this.images = res.data.data.results  
            this.total = res.data.data.total_count
        },
        // 当前页改变的时候触发，回调参数是	当前页
        changePage(newPage) {
            this.reqParams.page = newPage
            this.getImage()
        },
        // 全部与收藏的切换,绑定值变化时触发的事件,
        // 返回值是，选中的 Radio label 值
        toggleList() {
            this.reqParams.page = 1
            this.getImage()
        },
        // 收藏功能
        async toggleStatus(item) {
            // 考虑异常情况
            try {
                // 当前状态取反,收藏 -> 取消收藏,没有收藏的话 -> 已收藏
                const newCollect = !item.is_collected
                // 调用接口，修改
                await this.$http.put(`user/images/${item.id}`,{collect:newCollect})
                // 提示
                this.$message.success(newCollect ? '添加收藏成功' : '取消收藏成功')
                // 根据修改后的状态去改 星星的颜色，修改图片数据对应的状态is_collected即可
                item.is_collected = newCollect
            } catch (error) {
                 // 提示
                this.$message.success(newCollect ? '添加收藏失败' : '取消收藏失败')
            }
        },
        // 删除功能
        delImage(id) {
            this.$confirm('此操作将永久删除该图片素材, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // 点击确认
                // 考虑异常
                try {
                    await this.$http.delete(`user/images/${id}`)
                    this.$message.success('删除成功！');
                    this.getImage()
                } catch (error) {
                    this.$message.error('删除失败！');
                }
            }).catch(() => {
                // 点击取消不做任何逻辑
            });
        },
        // 添加素材
        addImage() {
            // 点击时显示对话框
            this.dialogVisible = true
            // 清空图片上传的预览地址
            this.imageUrl = null
        }
    }
}
</script>

<style lang="less" scoped>
    .img-box {
        margin-top: 20px;
        .img-item {
            display: inline-block;
            width: 180px;
            height: 180px;
            margin-right: 60px;
            margin-bottom: 20px;
            border: 1px dashed #ddd;
            position: relative;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
            .img-icon {
                width: 100%;
                height: 30px;
                background: rgba(0, 0, 0, .3);
                position: absolute;
                left: 0;
                bottom: 0;
                color: #fff;
                text-align: center;
                span {
                    margin: 0 20px;
                    // &(连接符)
                    // 不加&解析后：span .red{} 后代选择器
                    // 加上&节后后：span.red{}  交集选择器
                    &.red{
                        color:red;
                    }
                }
            }
        }
    }
</style>