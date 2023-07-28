# c-for
c-for循环主要还是为了解决列表数组的问题，循环出来的数据也是虚拟dom，但是有一点，在大规模的渲染并不友好，可能需要用算法去解决，因为循环在绑定的时候，直接指向了触发，所以哪怕更改了一个值，我也会重新渲染整个，在优化中
# 循环赋值
c-for可以循环一些简单数组
```
html
 <div c-for="(item,index) in arr()">{{ item() }}</div>

js
const app = createCain({
      use: ".app",
      setup() {
         const [arr, setArr] = createSignal(["cain.js","cain.js"]);
        return {
            arr
        }
      },
});
```
# 对象循环赋值
我们可以创建一个对象数组
```
html
 <div c-for="(item,index) in arr()">{{ item().id }}</div>

js
const app = createCain({
      use: ".app",
      setup() {
         const [arr, setArr] = createSignal([{id:0},{id:1}]);
        return {
            arr
        }
      },
});
```
我们直接在方法之后再去.属性的名称就ok了