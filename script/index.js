import { retrieval } from "../package/core";

// 存放数据的桶子
let bucket = {};
// 导出函数
let cainFuc = {};

let AppCalss = new cainApp();
// cainApp 全局变量链
class cainAppJs {
  use(fn) {
    fn.install(AppCalss);
  }
}

class cainApp {
  fn = {};
  addFn(name, fn) {
    this.fn[name] = fn;
    bucket[name] = {
      use: name,
      fn: [],
    };
  }
  addBucket(name, fn) {
    // bucket[name]
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
  var ufunc = app.setup(AppCalss);
  cainFuc = ufunc;
  // 核心函数 检索dom
  retrieval(use);
};
window.createCain = createCain;

export { bucket, cainFuc, createCain };
