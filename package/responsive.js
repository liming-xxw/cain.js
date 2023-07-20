/*
 * @Title: 执行函数方法
 * @Dosc: 根据传递的函数方法，然后用with的特性，实现执行函数
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-20 14:44:30
 */
function createExpInstance() {
  for (let key in cainFuc) {
    this[key] = cainFuc[key];
  }
}
// 挂载原型链
createExpInstance.prototype.executeCode = function (code) {
  let strCode = `return (()=>{with (this) {return ${code}}})()`;
  let func = new Function(strCode);
  let currentFunc = func.bind(this);
  return currentFunc();
};

/*
 * @Title: 返回执行的响应式函数
 * @Dosc: 根据传入的函数，启动执行Function 然后将值传回去
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-20 14:42:57
 */
const returnExpInstance = (func) => {
  let expInstance = new createExpInstance();
  let code = expInstance.executeCode(func);
  return code;
};

/*
 * @Title: 添加响应式方法
 * @Dosc: 优化加入响应式操作，可以更加简单添加方法
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-20 14:42:57
 */
const addResponsive = (use, fn) => {
  Object.values(bucket).forEach((v) => {
    if (v.use == use) {
      v.fn.push(fn);
    }
  });
};
