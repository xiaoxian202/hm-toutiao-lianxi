<template>
    <!--sync修饰符,给组件属性绑定上,给属性加的修饰符  
    如果一个组件上已经绑定了v-model还想再进行双向绑定，可以使用sync-->
    <div class="my-prop-sync">
        {{msg}}
        <button @click="fn">父组件箱子组件传值</button>
    </div>
</template>

<script>
export default {
    // 接值
    props:['msg'],
    data() {
        return {
            myMsg:'我是子组件的数据'
        }
    },
    methods:{
        fn() {
            this.$emit('update:msg',this.myMsg)
        }
    }
}
</script>

<style lang="less" scoped>

</style>