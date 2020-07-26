<template>
    <div class="container-fans">
        <el-card>
            <div slot="header">
                <my-bread>粉丝管理</my-bread>
            </div>
            <!-- tabs标签页 -->
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="粉丝列表" name="list">
                    <div class="image-list">
                        <!-- key的数据类型只能是string/number，因为超过了最大安全范围，所以转成字符串 -->
                        <div class="list-item" v-for="item in images" :key="item.id.toString()">
                            <el-avatar :size="80" :src="item.photo"></el-avatar>
                            <p>item.name</p>
                            <el-button type="primary" plain>关注</el-button>
                        </div>
                    </div>
                    <!-- 分页 -->
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="reqParams.per_page"
                        :current-page="reqParams.page"
                        @current-change="changePage">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="粉丝画像" name="image" >
                    <!-- echarts -->
                    <div ref="bar" style="width: 600px;height:400px;"></div>
                </el-tab-pane>
            </el-tabs>
            
        </el-card>
    </div>
</template>

<script>
// 导入echarts
import echarts from 'echarts'
export default {
    name:'page-fans',
    data() {
        return{
            // 默认触发标签
            activeName:'image',
            // 粉丝列表
            images:[],
            // 筛选数据
            reqParams:{
                page:1,
                per_page:24
            },
            // 总页数
            total:0
        }
    },
    created() {
        this.getFans()
    },
    mounted() {
        // echarts初始化，不能放到created中，需要操作dom created中是undefined
        this.initBar()
    },
    methods:{
        // 获取粉丝列表
        async getFans() {
            const res = await this.$http.get('followers',{params:this.reqParams})
            // console.log(res.data);
            this.images = res.data.data.results
            this.total = res.data.data.total_count
        },
        // 切换页码
        changePage(newPage) {
            this.reqParams.page = newPage
            this.getFans()
        },
        async initBar() {
            // 考虑异常
            try {
                // 初始化echarts
                const myChart = echarts.init(this.$refs.bar)
                // 定义图表配置
                const option = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                        type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            // x轴的刻度数据
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                        type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            barWidth: '60%',
                            // x轴刻度对应的数据
                            data: [10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                }
                // 获取数据给option赋值
                const res = await this.$http.get('statistics/followers')
                console.log(res.data);
                const obj = res.data.data.age
                const xAxisData = []
                const seriesData = []
                for(const key in obj) {
                    xAxisData.push(key)
                    seriesData.push(obj[key])
                }
                option.xAxis[0].data = xAxisData
                option.series[0].data = seriesData

                // 设置配置
                myChart.setOption(option)
            } catch (error) {
                this.$message.error('网络异常，请刷新重试')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.image-list {
    .list-item {
        display: inline-block;
        width: 100px;
        height: 170px;
        border: 1px dashed #ddd;
        margin-right: 40px;
        margin-bottom: 20px;
        text-align: center;
        padding-top: 10px;
        p{
            margin: 10px;
            font-size: 14px;
        }
    }
}
</style>