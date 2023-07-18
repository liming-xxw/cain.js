/*
 * @Title: 注册指令函数
 * @Dosc: 根据不同的指令分配
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-18 12:46:55
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
      case "c-bind":
        cBind(name, node, event);
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
  node.addEventListener(event, (el) => {
    const { fuc, val } = strSpliceFuc(func, "(", ")");
    //  判断方法有没有传值，没有就将默认的el元素传递进去，模拟原生事件
    if (val) {
      let expInstance = new createExpInstance();
      expInstance.executeCode(func);
    } else {
      cainFuc[fuc](el);
    }
  });
};

const cBind = (func, node, event) => {
  if (event == "style") {
    var pairs = func.slice(1, -1).split(",");
    var obj = {};
    pairs.forEach(function (pair) {
      // 分割属性名和属性值
      var parts = pair.split(":");
      var key = parts[0].trim();
      var value = parts[1].trim();

      // 去除属性名和属性值的引号（如果存在）
      if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }

      // 将属性名和属性值添加到对象中
      obj[key] = value;
    });
    const styleArr = {};
    Object.keys(obj).forEach((v) => {
      var match = obj[v].match(/^(.*?)\(/);
      if (match && match.length > 1) {
        var extractedString = match[1];
        styleArr[v] = {
          fuc: extractedString,
          is: true,
        };
      } else {
        styleArr[v] = {
          is: false,
        };
      }
    });
    let expInstance = new createExpInstance();
    let bindstyle = expInstance.executeCode(func);
    Object.keys(bindstyle).forEach((v) => {
      node.style[v] = bindstyle[v];
    });

    Object.keys(styleArr).forEach((v) => {
      let sAr = styleArr[v];
      if (sAr.is) {
        cainFuc[sAr.fuc](sAr.fuc);
        Object.values(bucket).forEach((k) => {
          if (k.use == sAr.fuc) {
            k.fn.push(() => {
              let expInstance = new createExpInstance();
              let bindstyle = expInstance.executeCode(func);
              node.style[v] = bindstyle[v];
            });
          }
        });
      }
    });

    // if (styleArr[v].is) {
    //   cainFuc[styleArr[v].fuc](styleArr[v].fuc);
    //   Object.values(bucket).forEach((k) => {
    //     if (k.use == styleArr[v].fuc) {
    //       k.fn.push(() => {
    //         let expInstance = new createExpInstance();
    //         let bindstyle = expInstance.executeCode(func);
    //         node.style[v] = bindstyle[v];
    //       });
    //     }
    //   });
    // }
  }
};
