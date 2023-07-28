# 动态绑定
v-bidn动态绑定是为了创建的值可以直接设置元素的html属性
# 绑定样式
最简单的绑定样式，比如想让这个文字颜色变成红色，我们可以这么做
```
html
<h4 v-bind:style="{color:color()}"></h4>

js
const app = createCain({
      use: ".app",
      setup() {
        const [color,setColor] = createSignal("red")
      },
});
```
我们只需要导出一个color变量，然后在动态绑定中直接使用即可
# 表达式绑定
我们支持js表达式写发，比如三目，条件运算，下面演示一下三目运算的写法
```
html
<h4 v-bind:style="{color:color() ? 'red' : 'blue'}"></h4>

js
const app = createCain({
      use: ".app",
      setup() {
        const [color,setColor] = createSignal(true)
      },
});
```
当color为true的时候就会是红色，当他为false的时候就是蓝色，这就是表达式的方式运算，
同样的我们还支持多种写法，比如 ! 或者 & 都可以

