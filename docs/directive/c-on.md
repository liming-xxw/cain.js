# c-on 
c-on是为了绑定元素的事件操作，方便去改变数据的值
# 简单绑定
v-on绑定的时候可以直接执行单行语句，比如alert，console，示例如下
```
<h4 v-on:click="alert('cain.js')">点击事件</h4>
```
# 赋值绑定
我们也可以直接执行导出的方法
```
html
<h4 c-on:click="setCount(count()+1)">{{ count() }}</h4>

js
const app = createCain({
      use: ".app",
      setup() {
        const [count,setCount] = createSignal(0)
      },
      return {
        count,
        setCount
      }
});
```
注意因为我们语法特殊的原因，是不可以使用++运算的，所以直接+1就可以解决
