<template>
  <div class="container-publish">
      <el-card>
            <div slot="header">
                <my-bread>{{this.$route.query.id ? '修改文章' : '发布文章'}}</my-bread>
            </div>
            <!-- 表单 -->
            <el-form label-width="120px" :model="articleForm" :rules="ruleForm" ref="articleForm">
                <el-form-item label="标题: " prop="title">
                   <el-input v-model="articleForm.title" placeholder="请输入文章标题" style="width:400px"></el-input>
                </el-form-item>
                <el-form-item label="内容: " prop="content">
                    <!-- 双向绑定富文本 
                    ref="myQuillEditor"获取富文本组件实例对象
                    @blur="onEditorBlur($event)"失去焦点
                    @focus="onEditorFocus($event)"获取焦点
                    @ready="onEditorReady($event)"-->
                    <!-- trigger:blur 无法监听富文本失去焦点去进行校验 -->
                    <!-- 自己绑定富文本的失去焦点事件，在事件处理函数中对改字段进行校验即可 -->
                    <quill-editor 
                    v-model="articleForm.content"
                    :options="editorOption"
                    @blur="checkContent"/>
                </el-form-item>
                <el-form-item label="封面: " prop="cover.type">
                    <!-- @change="articleForm.cover.images=[]"改变封面类型，重置数据 -->
                    <el-radio-group @change="articleForm.cover.images=[]" v-model="articleForm.cover.type">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                    <!-- 一张封面 -->
                    <div style="margin-top:20px" v-if="articleForm.cover.type===1">
                        <!-- <my-image v-model="testURL"></my-image> -->
                        <my-image @confirm="checkCover" v-model="articleForm.cover.images[0]"></my-image>
                    </div>
                    <!-- 三张 -->
                    <div style="margin-top:20px" v-if="articleForm.cover.type===3">
                        <my-image @confirm="checkCover" v-for="i in 3" :key="i" v-model="articleForm.cover.images[i-1]"></my-image>
                    </div>
                </el-form-item>
                <el-form-item label="频道: " prop="channel_id">
                    <my-channel v-model="articleForm.channel_id"></my-channel>
                </el-form-item>
                <!-- 修改文章按钮 -->
                <el-form-item v-if="this.$route.query.id">
                    <el-button @click="editArticle" type="success">修改文章</el-button>
                </el-form-item>
                <el-form-item v-else>
                    <el-button type="primary" @click="saveArticle(false)">发布文章</el-button>
                    <el-button @click="saveArticle(true)">存入草稿</el-button>
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
        // 封面自定义校验
        const validCoverFn = (rule,value,callback) => {
            // value 封面类型：1 3 0 -1 这些类型，就是cover.type
            // - cover.type === 1 单图，cover.images['图片地址']  必须有且只有一张图片。
            // - cover.type === 3 三图，cover.images['地址1','地址2','地址3'] 必须有三张图
            const images = this.articleForm.cover.images
            if(value === 1) {
                // 如果图片存在，并且长度等于1
                if(images[0] && images.length === 1) {
                    callback()
                }else {
                    callback(new Error('请选择一张封面图'))
                }
            }else if (value === 3) {
                if (images[0] && images[1] && images[2]) {
                    callback()
                } else {
                    callback(new Error('请选择三张封面图'))
                }
            }else {
                callback()
            }
        }
        return {
            // 测试封面图片地址
            // testURL:null,
            // 表单数据对象
            articleForm:{
                title:null,
                // 频道id
                channel_id:null,
                // 富文本内容
                content:null,
                // 封面 单选框组
                cover:{
                    // 封面类型
                    type:1,
                    // 图片数据
                    images:[]
                }
            },
            // 表单校验规则对象
            ruleForm:{
                title:[
                    { required: true, message: '请输入文章标题', trigger: 'blur' },
                    { min: 5, max: 30, message: '标题5-30个字符串', trigger: 'blur' }
                ],
                content:[
                    { required: true, message: '请输入文章内容', trigger: 'blur' },
                ],
                channel_id:[
                    { required: true, message: '请选择所属频道', trigger: 'change' }
                ],
                // 单选项框组绑定的是 articleForm.cover.type 它能触发change来进行校验
                'cover.type':[
                    {validator:validCoverFn,trigger: 'change'}
                ]
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
    },
    // 数据初始化的时候，获取修改数据
    created(){
        // 如果组件初始化，默认发布文章场景
        // 如果是编辑文章，咱们才有事情去做，填充表单
        if(this.$route.query.id) {
            this.getArticle()
        }
    },
    methods:{
        // 文章内容,失去焦点时触发
        checkContent() {
            // 通过表单组件来使用声明好的content校验规则去校验content字段
            // validateField('字段名')对部分表单字段进行校验的方法
            this.$refs.articleForm.validateField('content')
        },
        // 触发表单封面校验
        checkCover() {
            this.$refs.articleForm.validateField('cover.type')
        },
        // 添加文章
        saveArticle(draft) {
            // 对整体表单进行校验
            this.$refs.articleForm.validate(async valid => {
                if (valid) {
                    // 考虑异常情况
                    try {
                        // 发布文章
                        await this.$http.post(`articles?draft=${draft}`,this.articleForm)
                        // 提示
                        this.$message.success(draft ? '存入草稿成功' :'发布文章成功')
                        // 跳转到内容管理
                        this.$router.push('/article')
                    } catch (error) {
                        // 提示
                        this.$message.success(draft ? '存入草稿失败' :'发布文章失败')
                    }
                }
            })
        },
        // 获取文章+填充表单
        async getArticle() {
            const res = await this.$http.get(`articles/${this.$route.query.id}`)
            this.articleForm = res.data.data
        },
        // 修改文章
        editArticle() {
            // 对表单进行整体校验
            this.$refs.articleForm.validate(async valid => {
                if(valid) {
                   try {
                        const res = await this.$http.put(`articles/${this.$route.query.id}?draft=false`,this.articleForm)
                        // 提示
                        this.$message.success('修改文章成功')
                        // 跳转内容管理
                        this.$router.push('/article')
                   } catch (error) {
                       // 提示
                        this.$message.success('修改文章失败')
                   }

                }
            })
        }
    },
    // 组件不会初始化，侦听器监听地址栏ID的变化
    watch:{
        '$route.query.id':function() {
            if (this.$route.query.id) {
                // 修改文章 + 填充表单
                this.getArticle()
            } else {
                // 发布文章 + 重置表单（还原数据，清除校验）
                // resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                this.$refs.articleForm.resetFields()
                // 图片是复杂数据类型，element不给清除，手动清空
                this.articleForm.cover.images = []
            }
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