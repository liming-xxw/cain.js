# 贡献指南
对于开源作品来说，我非常希望他受到大家的喜爱，并且愿意共同出一份力，这也是相互学习的一个过程，在源码中很多代码实现是非常暴力的，所以期待大家的pr
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
