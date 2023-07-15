/*
 * @Title: 注册指令函数
 * @Dosc: 根据不同的指令分配
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-15 23:37:15
 */
const directive = (dir, name, node) => {
  if (name) {
    switch (dir) {
      case "c-if":
        cIf(name, node);
        break;
      case "c-click":
        cClick(name, node);
        break;
    }
  }
};

/*
 * @Title: c-if 函数
 * @Dosc: 根据判断布尔值来显示隐藏
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-15 22:33:58
 */
const cIf = (isIf, node) => {
  if (isIf == "false") {
    node.style.display = "none";
  } else if (Boolean(cainFuc[isIf])) {
    cainFuc[isIf](isIf);
    Object.values(bucket).forEach((v) => {
      if (v.use == isIf) {
        if (!cainFuc[isIf]()) {
          node.style.display = "none";
          v.fn.push(() => {
            if (cainFuc[isIf]()) {
              node.style.display = "block";
            } else {
              node.style.display = "none";
            }
          });
        }
      }
    });
  }
};

/*
 * @Title: c-click 函数
 * @Dosc: 处理好元素的点击方法
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-15 22:33:58
 */
const cClick = (func, node) => {
  node.onclick = () => {
    const { fuc, val } = strSpliceFuc(func, "(", ")");
    //  判断传递的值是不是注册的方法
    if (cainFuc[fuc]) {
      // 判断传入方法的值是不是注册的值
      if (cainFuc[val]) {
        cainFuc[fuc](cainFuc[val]());
      } else {
        cainFuc[fuc](val);
      }
    } else {
      new Function(func)();
    }
  };
};
