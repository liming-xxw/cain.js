import { strObject, strRegex, strSpliceFuc } from "../utils/strTarn";
import { cainFuc } from "../script/index";
import { retrieval } from "./core";
import {
  returnExpInstance,
  addExpInstance,
  removeExpInstance,
  addResponsive,
} from "./responsive";

// 策略模式
const directiveStrategy = {
  // c-if指令
  "c-if": (isIf, node) => {
    const code = returnExpInstance(isIf);
    node.style.display = code ? "block" : "none";
    const func = strSpliceFuc(isIf, "(", ")");
    try {
      cainFuc[func.fuc](func.fuc);
      addResponsive(func.fuc, () => {
        const code = returnExpInstance(isIf);
        node.style.display = code ? "block" : "none";
      });
    } catch (err) {}
  },
  // c-show指令
  "c-show": (isIf, node) => {
    const code = returnExpInstance(isIf);
    node.style.display = code ? "block" : "none";
    const func = strSpliceFuc(isIf, "(", ")");
    try {
      cainFuc[func.fuc](func.fuc);
      addResponsive(func.fuc, () => {
        const code = returnExpInstance(isIf);
        node.style.display = code ? "block" : "none";
      });
    } catch (err) {}
  },
  // c-text
  "c-text": (func, node) => {
    // 执行code返回
    const code = returnExpInstance(func);
    let strOk = strSpliceFuc(func, "(", ")");
    let str = code;
    if (Array.isArray(code)) {
      str = `[${code}]`;
    }
    node.innerText = String(str);
    try {
      cainFuc[strOk.fuc](strOk.fuc);
      addResponsive(strOk.fuc, () => {
        const code = returnExpInstance(func);
        let str = code;
        if (Array.isArray(code)) {
          str = `[${code}]`;
        }
        node.innerText = String(str);
      });
    } catch (err) {}
  },
  // c-html
  "c-html": (func, node) => {
    const code = returnExpInstance(func);
    let strOk = strSpliceFuc(func, "(", ")");
    node.innerHTML = code;
    try {
      cainFuc[strOk.fuc](strOk.fuc);
      addResponsive(strOk.fuc, () => {
        const code = returnExpInstance(func);
        node.innerHTML = code;
      });
    } catch {}
  },
  // c-on
  "c-on": (func, node, event) => {
    node.addEventListener(event, (el) => {
      const { fuc, val } = strSpliceFuc(func, "(", ")");
      //  判断方法有没有传值，没有就将默认的el元素传递进去，模拟原生事件
      if (val) {
        returnExpInstance(func);
      } else {
        cainFuc[fuc](el);
      }
    });
  },
  // c-bind
  "c-bind": (func, node, event) => {
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
  },
  // c-for
  "c-for": (func, node) => {
    const cfor = func.split(" in ");
    const item = strSpliceFuc(cfor[0].trim(), "(", ")");
    const KeyIn = item.fuc == "" ? item.val.split(",") : [item.fuc];
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

      item[KeyIn[0]] = () => {
        return val;
      };
      try {
        item[KeyIn[1]] = () => {
          return index;
        };
      } catch (er) {}
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
        try {
          item[KeyIn[1]] = () => {
            return index;
          };
        } catch (er) {}
        addExpInstance(item);
        retrieval(appNode);
        removeExpInstance(item);
        parNode.appendChild(appNode);
        nodeArr.push(appNode);
      });
    });
  },
};
// 指令策略分发
const makeStrategy = (dir, name, node, event) => {
  if (name) {
    const directivestrategy = directiveStrategy[dir];
    if (directiveStrategy) {
      directivestrategy(name, node, event);
    }
  }
};

/*
 * @Title: 插值表达式
 * @Dosc: 根据传过来的字符串提取出插值表达式的语法，然后对应的去替换成方法，完成数据的响应
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-28 21:14:02
 */
var cainStr = "";
export const setCainStr = (str) => {
  cainStr = str;
};
const cainExpression = (str, node) => {
  //  定义好正则匹配
  cainStr = "";
  const regex = /{{(.*?)}}/g;
  const result = str.replace(regex, strRegex);
  if (cainStr != "") {
    node.innerText = result;
    addResponsive(cainStr, () => {
      const result = str.replace(regex, strRegex);
      if (cainFuc[cainStr]) {
        node.innerText = result;
      }
    });
  }
};

export { cainExpression, cainStr, makeStrategy };
