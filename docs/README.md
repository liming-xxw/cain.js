# 开始使用cain.js
cain.js 是一个专为html启用的js，轻量便捷。
# 快速开始
要使用cain.js的话，我们只需要将下面的script链接复制到你项目中
```
<script src="https://cainblog.oss-cn-hangzhou.aliyuncs.com/cain.min.js"><script>
```
引入之后需要再最上层空间中写一个选择器作为检索的dom元素，名称自己定义只需要在挂载的时候放上去就好了，下面就是完成的示例文件
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cain.js</title>
  </head>
  <body>
    <div class="app">
      <h4>非常感谢选择Cain.js</h4>
    </div>
  </body>
  <script src="ht tps://cainblog.oss-cn-hangzhou.aliyuncs.com/cain.min.js"></script>
  <script>
    const app = createCain({
      use: ".app",
      setup() {},
    });
  </script>
</html>
```
