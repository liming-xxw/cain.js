import { cainFuc, bucket } from "../script/index";

/*
 * @Title: 执行函数方法
 * @Dosc: 根据传递的函数方法，然后用with的特性，实现执行函数
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-08-02 18:05:10
 */

let expInstance = null;

// 新的数据桶子
let cainBucket = new WeakMap();

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
// 加载特殊变量
createExpInstance.prototype.setCode = function (ar) {
  for (let key in ar) {
    this[key] = ar[key];
    cainFuc[key] = ar[key];
  }
};
// 删除变量
createExpInstance.prototype.removeCode = function (ar) {
  for (let key in ar) {
    delete this[key];
    delete cainFuc[key];
  }
};

/*
 * @Title: 返回执行的响应式函数
 * @Dosc: 根据传入的函数，启动执行Function 然后将值传回去
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-20 14:42:57
 */
const returnExpInstance = (func) => {
  if (expInstance == null) {
    expInstance = new createExpInstance();
  }
  let code = expInstance.executeCode(func);
  return code;
};

// 添加执行变量方法
const addExpInstance = (ar) => {
  expInstance.setCode(ar);
};
// 删除执行变量方法
const removeExpInstance = (ar) => {
  expInstance.removeCode(ar);
};

/*
 * @Title: 添加响应式方法
 * @Dosc: 优化加入响应式操作，可以更加简单添加方法
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-20 14:42:57
 */
const addResponsive = (use, fn) => {
  console.log(cainFuc);
  console.log(bucket);
  Object.values(bucket).forEach((v) => {
    if (v.use == use) {
      v.fn.push(fn);
    }
  });
};

// 加入响应式函数
let idx = 0;
const addBucket = () => {
  const use = new String("cainBucket" + idx);
  let depsMap = new Map();
  cainBucket.set(use, depsMap);
  idx++;
  return use;
};

// 绑定响应式对象
const setBucket = (use, name) => {
  if (!cainBucket.has(use)) {
    return cainBucket.get(use);
  }
  let depsMap = cainBucket.get(use);
  let desp = new Set();
  depsMap.set(name, desp);
};

// 查询绑定方法
const getBucketFn = (use, name) => {
  console.log(name);
  if (!cainBucket.has(use)) {
    return cainBucket.get(use);
  }
  let depsMap = cainBucket.get(use);
  if (!depsMap.has(name)) {
    return depsMap.get(name);
  }
  let deps = depsMap.get(name);
  return deps;
};

// 添加方法
const setBucketFn = (use, name, fn) => {
  if (!cainBucket.has(use)) {
    return cainBucket.get(use);
  }
  let depsMap = cainBucket.get(use);
  if (!depsMap.has(name)) {
    return depsMap.get(name);
  }
  let deps = depsMap.get(name);
  deps.add(fn);
};

export {
  returnExpInstance,
  addExpInstance,
  removeExpInstance,
  addResponsive,
  addBucket,
  setBucket,
  getBucketFn,
  setBucketFn,
};
