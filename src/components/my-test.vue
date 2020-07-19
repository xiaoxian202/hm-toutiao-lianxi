<template>
  <div class="container-test">
      <div class="header">头</div>
      <div class="content">
          <!-- 名字con的插槽 -->
          <slot name="con" :msg="msg" abc="123"></slot>
      </div>
      <div class="footer">
          <!-- 名字foo的插槽 -->
            <slot name="foo"></slot>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg:'拥有插槽组件的内部数据'
        }
    }
}
</script>

<style lang="less" scoped>

</style>