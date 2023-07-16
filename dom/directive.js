/*
 * @Title: 注册指令函数
 * @Dosc: 根据不同的指令分配
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-16 14:52:03
 */
const directive = (dir, name, node, event) => {
  if (name) {
    switch (dir) {
      case "c-if":
        cIf(name, node);
        break;
      case "c-on":
        cOn(name, node, event);
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
 * @Title: c-on 函数
 * @Dosc: 处理好元素的点击方法
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-15 22:33:58
 */
const cOn = (func, node, event) => {
  node.addEventListener(event, () => {
    const { fuc, val } = strSpliceFuc(func, "(", ")");
    //  判断传递的值是不是注册的方法
    if (cainFuc[fuc]) {
      // 判断传入方法的值是不是注册的值
      if (cainFuc[val]) {
        cainFuc[fuc](cainFuc[val]());
      } else {
        if (val == "true" || val == "false") {
          cainFuc[fuc](val === "true" ? true : false);
        } else {
          cainFuc[fuc](val);
        }
      }
    } else {
      new Function(func)();
    }
  });
};
