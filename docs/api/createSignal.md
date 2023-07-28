# createSignal 
这个语法是用来创建响应式数据，和react有点相似吧，但是我是返回了俩个方法也就是都需要使用方法来调用示例如下
```
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
创建好的数据在html中就可以调用了，插值，方法中都可以使用

