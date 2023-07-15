// 存放数据的桶子
let bucket = {};
// 导出函数
let cainFuc = {};
/*
 * @Title: Cain.js 主入口
 * @Dosc: 入口函数
 * @Date: 2023-07-14 20:16:09
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-15 22:01:05
 */
const createCain = (app) => {
  // 判断有没有挂载目
  if (document.querySelector(app.use) == null) {
    console.error("请先挂载目录 / Please mount the directory first");
    return false;
  }

  // 挂载目录
  const use = document.querySelector(app.use);

  // 函数实现
  var ufunc = app.setup();
  cainFuc = ufunc;

  // 核心函数 检索dom
  retrieval(use);
};
/*
 * @Title: 创建响应式函数
 * @Dosc: 创建响应式函数对象，返回俩个函数值
 * @Date: 2023-07-14 20:16:09
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-15 15:52:12
 */
// 全局方法索引
let uindex = 0;
const createSignal = (val) => {
  let use = "CainState" + uindex;
  bucket[use] = {
    use: null,
    fn: [],
  };
  uindex++;
  let value = val;
  const get = (cuse) => {
    if (cuse) bucket[use].use = cuse;
    return value;
  };
  const set = (cain) => {
    value = cain;
    bucket[use].fn.forEach((fn) => {
      fn();
    });
  };
  return [get, set];
};
