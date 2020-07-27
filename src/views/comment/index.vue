<template>
    <div class="container-comment">
        <el-card>
            <div slot="header">
                <my-bread>评论管理</my-bread>
            </div>
            <!-- 表格 -->
            <el-table :data="comments">
                <el-table-column label="文章标题" prop="title" width="400px"></el-table-column>
                <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
                <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        {{scope.row.comment_status ? '已打开' : '已关闭'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100px">
                    <template slot-scope="scope">
                        <el-button @click="saveComment(scope.row)" v-if="scope.row.comment_status" type="danger" size="small">关闭评论</el-button>
                        <el-button @click="saveComment(scope.row)" v-else type="success" size="small">打开评论</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                background
                layout="prev, pager, next,sizes"
                :total="total"
                :page-sizes=[10,20,30,40,50]
                :page-size="reqParams.per_page"
                :current-page="reqParams.page"
                @current-change="changePage"
                @size-change="changeSize">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    name:'page-comment',
    data() {
        return {
            // 评论列表
            comments:[],
            // 筛选条件
            reqParams:{
                page:1,
                per_page:20,
                // 评论管理相关字段
                response_type:"comment"
            },
            // 总条数
            total:0,
        }
    },
    created() {
        this.getComment()
    },
    methods:{
        async getComment() {
            const res = await this.$http.get('articles',{params:this.reqParams})
            // console.log( res.data);
            this.comments = res.data.data.results
            this.total = res.data.data.total_count
        },
        // 改变页码
        changePage(newPage) {
            this.reqParams.page = newPage
            this.getComment()
        },
        // 改变每页个数
        changeSize(newSize) {
            this.reqParams.page = 1
            this.reqParams.per_page = newSize
            this.getComment()
        },
        // 打开/关闭评论
        saveComment(row) {
            const text1 = '此操作会关闭该文章的评论功能，关闭后用户将无法对该文章进行评论，您确认吗？'
            const text2 = '此操作会开启该文章的评论功能，您确认吗？'
            const text = row.comment_status ? text1 : text2 
            this.$confirm(text, '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // 异常
                try {
                    // 点击确认
                    // 修改文章状态
                    // await this.$http.put(`comment/status?crticle_id=${row.id}`,{
                    //     allow_comment : !row.comment_status
                    // })
                    // 简洁写法aixos.get/post
                    // 综合写法axios({})
                    await this.$http({
                        method:'put',
                        url:'comments/status',
                        // ?后键值对参数
                        params:{
                            // row.id超出最大安全值，json-bigint转化成了对象,转成字符传
                            article_id:row.id.toString()
                        },
                        // 请求体传参
                        data:{
                            allow_comment:!row.comment_status
                        }
                    })
                    // 提示
                    this.$message.success(row.comment_status ? '关闭评论成功' :'打开评论成功')
                    // 修改row当前的文章状态，驱动当前行进行渲染
                    row.comment_status = !row.comment_status
                } catch (error) {
                     // 提示
                    this.$message.error(row.comment_status ? '关闭评论失败' :'打开评论失败')
                }
                
            }).catch(() => {
                // 点击取消不作任何逻辑
            });
        }
    }
}
</script>

<style lang="less" scoped>

</style>