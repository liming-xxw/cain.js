import { retrieval } from "../package/core";
import { addBucket, getBucketFn, setBucket } from "../package/responsive";
// 存放数据的桶子
let cainBucket = new WeakMap();
// 导出函数
let cainFuc = {};

let AppCore = new cainApp();

class cainApp {
  // 注入链接方法
  fn = {};
  addFn(name, fn) {
    this.fn[name] = fn;
  }
  addBucket() {
    return addBucket();
  }
  setBucket(use, name) {
    return setBucket(use, name);
  }
  getBucketFn(use, cuse) {
    return getBucketFn(use, cuse);
  }
}

// cainApp 全局变量链
class cainAppJs {
  use(fn) {
    fn.install(AppCore);
  }
}

const createCain = (app) => {
  // 判断有没有挂载目
  if (document.querySelector(app.use) == null) {
    console.error("请先挂载目录 / Please mount the directory first");
    return false;
  }
  // 挂载目录
  const use = document.querySelector(app.use);
  // 挂载插件
  app.plugins(new cainAppJs());
  // 函数实现
  var ufunc = app.setup(AppCore);
  cainFuc = ufunc;
  // 核心函数 检索dom
  retrieval(use);
};
window.createCain = createCain;

export { cainFuc, createCain, cainBucket };
