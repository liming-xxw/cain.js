# 
# 简单使用
在引入了cain.js的情况下,在dom元素中可以直接使用定义好的变量来进行判断，
```
<h4 c-if="true">非常感谢选择Cain.js</h4>
```
这个可以是布尔条件也可以是我们定义的数据下
# 赋值使用
我们可以放入自己创建的值来进行判断赋值，同样还附带了响应式
```
html
<h4 c-if="flag()">非常感谢选择Cain.js</h4>

js 
const app = createCain({
      use: ".app",
      setup() {
        const [flag,setFlag] = createSignal(true)
      },
});
```
<!-- # 表达式使用 -->
