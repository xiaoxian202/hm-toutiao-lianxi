<template>
    <!-- select选择器  clearable:是否清空选项 -->
    <!-- 不能使用v-model使用value数据，value是单向的不能被修改 -->
    <!-- :value 给组件赋值 -->
    <el-select @change="changeChannel" clearable :value="value" placeholder="请选择">
      <el-option
        v-for="item in channelOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>           
    </el-select>
</template>

<script>
export default {
    name:'my-channel',
    props:['value'],
    data() {
        return {
            // channel_id:null,//用不上了
            channelOptions:[]
        }
    },
    created() {
        this.getChannels()
    },
    methods:{
        // 频道清空，改变值时触发
        // 参数为：目前的选中值
        changeChannel(val) {
            // 如果清空，val是“”字符串，应该设置成 null
            if(val === '') val = null
            // 将改变的数据传递给父组件
            this.$emit('input',val)
            // console.log(val);
        },
        // 获取频道文章
        async getChannels() {
            const res = await this.$http.get('channels')
            // console.log(res.data);
            this.channelOptions = res.data.data.channels
        },
    }
}
</script>

<style lang="less" scoped>

</style>