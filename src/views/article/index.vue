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
          <!-- 使用插件 -->
          <!--  :value=" reqParams.channel_id" @input="reqParams.channel_id=$event"
          是v-model的语法糖 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="dateArr"
            @change="changeDate"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
      <!-- 结果区域 -->
      <el-card>
        <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
        <!-- 表格 -->
        <template>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column label="封面">
              <template slot-scope="scope"> 
                <el-image
                style="width:180px;height:120px"
                :src="scope.row.cover.images[0]">
                  <div slot="error" class="image-slot">
                    <img src="@/assets/error.gif" alt="" style="width:180px;height:120px">
                  </div>
                </el-image>
              </template>
            </el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
                <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
                <el-tag v-if="scope.row.status===1">待审核</el-tag>
                <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
                <el-tag type="danger" v-if="scope.row.status===4">已删除</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="发布时间" prop="pubdate"></el-table-column>
            <el-table-column label="操作" width="120px">
                <template slot-scope="scope">
                  <el-button @click="btnEdit(scope.row.id)" type="primary" icon="el-icon-edit" circle plain></el-button>
                  <el-button @click="delArticle(scope.row.id)" type="danger" icon="el-icon-delete" circle plain></el-button>
                </template>
            </el-table-column>
          </el-table>
        </template>
        <!-- 分页 -->
        <el-pagination
          style="margin-top:20px"
          background
          layout="prev, pager, next"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
          :total="total">
        </el-pagination>
      </el-card>
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
// import MyBread from '@/components/my-bread.vue'
// import MyTest from '@/components/my-test.vue'
export default {
    // 注册
    // components:{MyBread},
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
          end_pubdate:null,
          // 页数
          page:1,
          //每页数量
          per_page:20
        },
        // 支持日期范围组件的数据，当你选择日期范围后分别给 begin和end日期赋值
        dateArr:[],
        // 表格数据
        tableData:[],
        // 频道选项
        channelOptions:[],
        // 文章总数
        total:0
      }
    },
    // 初始化获取数据
    created() {
      // this.getChannels()
      this.getArticle()
    },
    methods:{
      // 获取文章
      async getArticle() {
        const res = await this.$http.get('articles',{params:this.reqParams})
        // console.log(res.data);
        this.tableData = res.data.data.results
        this.total = res.data.data.total_count
      },
      // 当前页改变时触发
      // newPage当前页
      changePager(newPage) {
        this.reqParams.page = newPage
        // 刷新列表
        this.getArticle()
      },
      // 日期选择器，用户确认选定的值时触发
      changeDate(arr) {
        // arr是数组
        if (arr) {
          this.reqParams.begin_pubdate = arr[0]
          this.reqParams.end_pubdate = arr[1]
        } else {
          // 清空的时候，设置为空
          this.reqParams.begin_pubdate = null
          this.reqParams.end_pubdate = null
        }
      },
      // 筛选
      search() {
        this.reqParams.page = 1
        this.getArticle()
      },
      // 编辑按钮
      btnEdit(id) {
        // 跳转
        this.$router.push({
          path:`/publish/${id}`,
          query:{
            id
          }
        })
      },
      // 删除按钮
      delArticle(id) {
        this.$confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 考虑异常情况
          try {
            // 删除数据
            await this.$http.delete(`articles/${id}`)
            // 提示
            this.$message.success('删除成功')
            // 刷新页面
            this.getArticle()
          } catch (error) {
            his.$message.error('删除失败')
         }
        }).catch(() => {
          //  点击取消，不作任何逻辑操作
        });
      }
    }
}
</script>

<style lang="less" scoped>

</style>>
