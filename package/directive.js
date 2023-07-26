/*
 * @Title: 注册指令函数
 * @Dosc: 根据不同的指令分配
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-26 15:18:50
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
  const code = returnExpInstance(isIf);
  node.style.display = code ? "block" : "none";
  const func = strSpliceFuc(isIf, "(", ")");
  cainFuc[func.fuc](func.fuc);
  addResponsive(func.fuc, () => {
    const code = returnExpInstance(isIf);
    node.style.display = code ? "block" : "none";
  });
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
  addResponsive(strOk.fuc, () => {
    const code = returnExpInstance(func);
    let str = code;
    if (Array.isArray(code)) {
      str = `[${code}]`;
    }
    node.innerText = String(str);
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
  const code = returnExpInstance(func);
  let strOk = strSpliceFuc(func, "(", ")");
  node.innerHTML = code;
  cainFuc[strOk.fuc](strOk.fuc);
  addResponsive(strOk.fuc, () => {
    const code = returnExpInstance(func);
    node.innerHTML = code;
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

// c-for 预想实现原理，分割字符串，然后将in 后面的值转化为数据，找到前面的字符串，去搜索dom然后找到有匹配的值之后自动识别
const cFor = (func, node) => {
  const cfor = func.split(" in ");
  const item = strSpliceFuc(cfor[0].trim(), "(", ")");
  const KeyIn = item.val.split(",");
  const code = cfor[1].trim();
  const arrCode = returnExpInstance(code);
  node.removeAttribute("c-for");
  const parNode = node.parentNode;
  const oldHtml = node.cloneNode(true);
  node.innerHTML = "";
  let nodeArr = [];
  arrCode.forEach((val, index) => {
    let appNode = oldHtml.cloneNode(true);
    const item = {};
    item[KeyIn[0]] = (el) => {
      return val;
    };
    addExpInstance(item);
    retrieval(appNode);
    removeExpInstance(item);
    parNode.appendChild(appNode);
    nodeArr.push(appNode);
  });
  let strCode = strSpliceFuc(code, "(", ")");
  cainFuc[strCode.fuc](strCode.fuc);
  addResponsive(strCode.fuc, () => {
    const arrCode = returnExpInstance(code);
    let ar = [...nodeArr];
    nodeArr = [];
    arrCode.forEach((val, index) => {
      parNode.removeChild(ar[index]);
      let appNode = oldHtml.cloneNode(true);
      const item = {};
      item[KeyIn[0]] = (el) => {
        return val;
      };
      addExpInstance(item);
      retrieval(appNode);
      removeExpInstance(item);
      parNode.appendChild(appNode);
      nodeArr.push(appNode);
    });
  });
};
