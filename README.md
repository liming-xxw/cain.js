# Cain.js
一个轻巧的玩具框架，主要是为了html页面开发,为了减少语法上的疲倦，主要是仿照vue,但是cain.js的对标并不是vue，而是alpinejs,在工作有一个需求使用的alpinejs,不喜欢对于数据写在行内的语法，所以cain.js诞生了，一样的轻便，不一样的实现。
# 安装
只需要引入script链接既可以使用
```
<script src="https://cainblog.oss-cn-hangzhou.aliyuncs.com/cain.min.js"><script>
```
详细使用文档请移步Cain.js文档：[cain.js](https://liming-xxw.github.io/cain.js/#/)
# 进度
第一版cain.js已经完成，完成指令和响应式
# 文件描述
Package | Description
--- | ---
[package/core](packages/core) | 核心检索dom元素，包括分发配置指令
[package/directive](packages/directive) | 全部指令方法
[package/responsive](packages/responsive) | 注入代码返回，将传入的方法转换为值
[docs](docs) | 开发文档
[utils](utils) | 工具类
[build](build) | 配置webpack打包方法

这些就是全部的文件说明了，并不复杂，本身也没有想过制作大型的项目，复杂的直接上vue，react就好，专注于小型轻便的开发，比如独立网站之类的，所以我尽量的在压缩大小。
# 贡献代码
在仓库中下载文件，解压
暂时没有热更新这些所以每次修改好，需要手动进入build文件夹中输入webpack
修改好之后提交一次pr，审查没问题就会合并
