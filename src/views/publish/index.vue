<template>
  <div class="container-publish">
      <el-card>
            <div slot="header">
                <my-bread>发布文章</my-bread>
            </div>
            <!-- 表单 -->
            <el-form label-width="80px">
                <el-form-item label="标题: ">
                   <el-input v-model="articleForm.title" placeholder="请输入文章标题" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="内容: ">
                    <!-- 双向绑定富文本 
                    ref="myQuillEditor"获取富文本组件实例对象
                    @blur="onEditorBlur($event)"失去焦点
                    @focus="onEditorFocus($event)"获取焦点
                    @ready="onEditorReady($event)"-->
                    <quill-editor 
                    v-model="articleForm.content"
                    :options="editorOption"/>
                </el-form-item>
                <el-form-item label="封面: ">
                    <el-radio-group v-model="articleForm.cover.type">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                    <div style="margin-top:20px">
                        <my-image></my-image>
                        <my-image></my-image>
                        <my-image></my-image>
                    </div>
                </el-form-item>
                <el-form-item label="频道: ">
                    <my-channel v-model="articleForm.channel_id"></my-channel>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">发布文章</el-button>
                    <el-button>存入草稿</el-button>
                </el-form-item>
            </el-form>
      </el-card>
  </div>
</template>

<script>
// 导入富文本组件样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
    name:'page-publish',
    // 注册组件
    components: {quillEditor},
    data() {
        return {
            articleForm:{
                titel:null,
                // 频道id
                channel_id:null,
                // 富文本内容
                content:null,
                // 封面 单选框组
                cover:{
                    type:1
                }
            },
            // 富文本配置对象
            editorOption:{
                modules: {
                    toolbar: [
                        // 切换按钮
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        // 用户自定义按钮值
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        // 减少缩进/缩进
                        [{ 'indent': '-1'}, { 'indent': '+1' }],  
                        // 图片
                        ['image']
                    ]
                },
                // 默认占位提示：
                placeholder:"请输入文章内容"
            },
            
        }
    }
}
</script>

<style lang="less" scoped>
// 富文本样式
// ::v-deep 是深度作用符号，让选择器在其他组件下也生效。
.container-publish ::v-deep .ql-editor{
  height: 250px;
}
::v-deep .ql-toolbar.ql-snow {
  padding: 0 8px;
}
</style>