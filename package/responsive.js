/*
 * @Title: 添加响应式方法
 * @Dosc: 优化加入响应式操作，可以更加简单添加方法
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-20 12:55:10
 */
const addResponsive = (use, fn) => {
  Object.values(bucket).forEach((v) => {
    if (v.use == use) {
      v.fn.push(fn);
    }
  });
};
