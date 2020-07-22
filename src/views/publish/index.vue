<template>
  <div class="container-publish">
      <el-card>
            <div slot="header">
                <my-bread>发布文章</my-bread>
            </div>
            <!-- 表单 -->
            <el-form label-width="80px">
                <el-form-item label="标题">
                   <el-input v-model="reqParams.title" placeholder="请输入文章标题" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="内容"></el-form-item>
                <el-form-item label="封面"></el-form-item>
                <el-form-item label="频道"></el-form-item>
                <el-form-item>
                    <el-button type="primary">发布文章</el-button>
                    <el-button>存入草稿</el-button>
                </el-form-item>
            </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
    name:'page-publish',
    data() {
        return {
            reqParams:{
                titel:null,
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>