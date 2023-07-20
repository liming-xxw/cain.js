/*
 * @Title: 注册指令函数
 * @Dosc: 根据不同的指令分配
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-20 16:20:35
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
      case "c-text":
        cText(name, node);
        break;
      case "c-html":
        cHtml(name, node);
        break;
      case "c-for":
        cFor(name, node);
        break;
    }
  }
};

/*
 * @Title: 插值表达式
 * @Dosc: 根据传过来的字符串提取出插值表达式的语法，然后对应的去替换成方法，完成数据的响应
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.cain
 * @Last Modified time: 2023-07-15 22:33:58
 */
var cainStr = "";
const cainExpression = (str, node) => {
  //  定义好正则匹配
  cainStr = "";
  const regex = /{{(.*?)}}/g;
  const result = str.replace(regex, strRegex);
  if (cainFuc[cainStr]) {
    node.innerText = result;
    addResponsive(cainStr, () => {
      const result = str.replace(regex, strRegex);
      if (cainFuc[cainStr]) {
        node.innerText = result;
      }
    });
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
 * @Title: c-text 函数
 * @Dosc: 根据传输过来的值,响应之后直接覆盖该dom元素的文本
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-15 22:33:58
 */
const cText = (func, node) => {
  // 执行code返回
  const code = returnExpInstance(func);
  let strOk = strSpliceFuc(func, "(", ")");
  let str = code;
  if (Array.isArray(code)) {
    str = `[${code}]`;
  }
  node.innerText = String(str);
  cainFuc[strOk.fuc](strOk.fuc);
  Object.values(bucket).forEach((k) => {
    if (k.use == strOk.fuc) {
      k.fn.push(() => {
        const code = returnExpInstance(func);
        let str = code;
        if (Array.isArray(code)) {
          str = `[${code}]`;
        }
        node.innerText = String(str);
      });
    }
  });
};

/*
 * @Title: c-html 函数
 * @Dosc: 根据传输过来的值,响应之后直接覆盖该dom元素的html
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-15 22:33:58
 */
const cHtml = (func, node) => {
  // 执行code返回
  const code = returnExpInstance(func);
  let strOk = strSpliceFuc(func, "(", ")");
  node.innerHTML = code;
  cainFuc[strOk.fuc](strOk.fuc);
  Object.values(bucket).forEach((k) => {
    if (k.use == strOk.fuc) {
      k.fn.push(() => {
        const code = returnExpInstance(func);
        node.innerHTML = code;
      });
    }
  });
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

/*
 * @Title: c-bind
 * @Dosc: 处理好元素动态绑定的值
 * @flag: 待优化，实现原理可以更加简单便捷
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-15 22:33:58
 */
const cBind = (func, node, event) => {
  if (event == "style") {
    let obj = {};
    obj = strObject(func);
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
  } else if (event == "class") {
    let obj = {};
    obj = strObject(func);
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
    let bindClass = expInstance.executeCode(func);
    Object.keys(bindClass).forEach((v) => {
      if (bindClass[v]) {
        node.classList.add(v);
      } else {
        node.classList.remove(v);
      }
    });
    Object.keys(styleArr).forEach((v) => {
      let sAr = styleArr[v];
      if (sAr.is) {
        cainFuc[sAr.fuc](sAr.fuc);
        Object.values(bucket).forEach((k) => {
          if (k.use == sAr.fuc) {
            k.fn.push(() => {
              let expInstance = new createExpInstance();
              let bindClass = expInstance.executeCode(func);
              if (bindClass[v]) {
                node.classList.add(v);
              } else {
                node.classList.remove(v);
              }
            });
          }
        });
      }
    });
  } else {
    let expInstance = new createExpInstance();
    let bindClass = expInstance.executeCode(func);
    let styleArr = "";
    var match = func.match(/^(.*?)\(/);
    if (match && match.length > 1) {
      var extractedString = match[1];
      styleArr = extractedString;
    } else {
      extractedString = false;
    }
    node[event] = bindClass;
    cainFuc[styleArr](styleArr);
    Object.values(bucket).forEach((k) => {
      if (k.use == styleArr) {
        k.fn.push(() => {
          let expInstance = new createExpInstance();
          let bindClass = expInstance.executeCode(func);
          node[event] = bindClass;
        });
      }
    });
  }
};

/*
 * @Title: c-for
 * @Dosc: 处理元素的循环操作
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-15 22:33:58
 */
const cFor = (func, node) => {
  console.log(func);
  console.log(node);
};
