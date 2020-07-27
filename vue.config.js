module.exports = {
  // 保存时不做代码的风格校验
  lintOnSave: false,
  // 把一些第三方包排除在外，不去打包
  // vue-cli -> webpack打包工具
  configureWebpack:{
    externals:{
      // key(包的名字):value(通过script标签引入后，暴露在全局的变量名)
      echarts: 'echarts'
    }
  }
}
