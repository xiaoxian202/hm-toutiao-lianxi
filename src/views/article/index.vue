<template>
  <div class="container-article">
    <!-- 搜索区域 -->
    <el-card>
      <!-- 头部 面包屑 -->
      <div slot="header">
       <!-- 使用插槽 -->
       <my-bread>内容管理</my-bread>
      </div>
      <!-- 内容 表单-->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <!-- 单选框组 -->
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <!-- select选择器 -->
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option label="前端" :value="101"></el-option>
            <el-option label="Java" :value="102"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--slot-scope='data' 变量名，代表插槽上绑定的所有自定义属性数据 {msg:xxx,abc:123} -->
    <!-- 书写的时候会更加语义 变量名字：scope 代表插槽作用域数据 -->
    <!-- <my-test>
      <div slot="con" slot-scope="scope">
        内容{{scope.msg}}----{{scope.abc}}
      </div>
      <div slot="foo">底部</div>
    </my-test> -->
  </div>
</template>

<script>
// 导入自己封装的插槽
import MyBread from '@/components/my-bread.vue'
// import MyTest from '@/components/my-test.vue'
export default {
    // 注册
    components:{MyBread},
    // components:{MyTest},
    name:'page-article',
    // created() {
    //   // 发送请求 当前登录用户的文章 测试
    //   this.$http.get('articles').then((res) => {
    //     console.log(res.data);
    //   }).catch((err) => {
    //     console.log(err);
    //   })
    // }
    data() {
      return {
        reqParams:{
          // 	文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
          status:null,
          // 文章所属频道id
          channel_id:null,
          // 起始时间
          begin_pubdate:null,
          // 截止时间
          end_pubdate:null
        },
        // 支持日期范围组件的数据，当你选择日期范围后分别给 begin和end日期赋值
        dateArr:[]
      }
    }
}
</script>

<style lang="less" scoped>

</style>>
