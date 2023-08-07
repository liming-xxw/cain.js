import { strObject, strRegex, strSpliceFuc } from "../utils/strTarn";
import { cainFuc } from "../script/index";
import { retrieval } from "./core";
import {
  setBucketFn,
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
      var url = null;
      cainFuc[func.fuc](func.fuc, (curl) => {
        url = curl;
      });
      setBucketFn(url, func.fuc, () => {
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
      var url = null;
      cainFuc[func.fuc](func.fuc, (curl) => {
        url = curl;
      });
      setBucketFn(url, func.fuc, () => {
        const code = returnExpInstance(isIf);
        node.style.display = code ? "block" : "none";
      });
    } catch (err) {}
  },
  // c-text
  "c-text": (val, node) => {
    // 执行code返回
    const code = returnExpInstance(val);
    let func = strSpliceFuc(val, "(", ")");
    let str = code;
    if (Array.isArray(code)) {
      str = `[${code}]`;
    }
    node.innerText = String(str);
    try {
      var url = null;
      cainFuc[func.fuc](func.fuc, (curl) => {
        url = curl;
      });
      setBucketFn(url, func.fuc, () => {
        const code = returnExpInstance(val);
        let str = code;
        if (Array.isArray(code)) {
          str = `[${code}]`;
        }
        node.innerText = String(str);
      });
    } catch (err) {}
  },
  // c-html
  "c-html": (val, node) => {
    const code = returnExpInstance(val);
    let func = strSpliceFuc(val, "(", ")");
    node.innerHTML = code;
    try {
      var url = null;
      cainFuc[func.fuc](func.fuc, (curl) => {
        url = curl;
      });
      setBucketFn(url, func.fuc, () => {
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
  "c-bind": (code, node, event) => {
    if (event == "style") {
      const strObj = strObject(code);
      const regex = /([a-zA-Z_]\w*)\s*\(\)/;
      const styleObj = {};
      Object.keys(strObj).forEach((v) => {
        const match = strObj[v].match(regex);
        if (match && match[1]) {
          const methodName = match[1].trim();
          styleObj[v] = {
            fuc: methodName,
            is: true,
          };
        } else {
          styleObj[v] = {
            fuc: undefined,
            is: false,
          };
        }
      });
      const bindObj = returnExpInstance(code);
      Object.keys(bindObj).forEach((v) => {
        node[event][v] = bindObj[v];
      });
      Object.keys(styleObj).forEach((v) => {
        let func = styleObj[v];
        if (func.is) {
          var url = null;
          cainFuc[func.fuc](func.fuc, (curl) => {
            url = curl;
          });
          setBucketFn(url, func.fuc, () => {
            const bindObj = returnExpInstance(code);
            Object.keys(bindObj).forEach((v) => {
              node[event][v] = bindObj[v];
            });
          });
        }
      });
    } else if (event == "class") {
      const strObj = strObject(code);
      const bindObj = returnExpInstance(code);
      const regex = /([a-zA-Z_]\w*)\s*\(\)/;
      const classObj = {};
      Object.keys(strObj).forEach((v) => {
        const match = strObj[v].match(regex);
        if (match && match[1]) {
          const methodName = match[1].trim();
          classObj[v] = {
            fuc: methodName,
            is: true,
          };
        } else {
          classObj[v] = {
            fuc: undefined,
            is: false,
          };
        }
      });

      Object.keys(bindObj).forEach((v) => {
        if (bindObj[v]) {
          node.classList.add(v);
        } else {
          node.classList.remove(v);
        }
      });

      Object.keys(classObj).forEach((v) => {
        let func = classObj[v];
        if (func.is) {
          var url = null;
          cainFuc[func.fuc](func.fuc, (curl) => {
            url = curl;
          });
          setBucketFn(url, func.fuc, () => {
            Object.keys(bindObj).forEach((v) => {
              if (bindObj[v]) {
                node.classList.add(v);
              } else {
                node.classList.remove(v);
              }
            });
          });
        }
      });
    } else {
      const arrt = returnExpInstance(code);
      node[event] = arrt;
      const regex = /([a-zA-Z_]\w*)\s*\(\)/;
      let func = code.match(regex);
      var url = null;
      cainFuc[func[1]](func[1], (curl) => {
        url = curl;
      });
      setBucketFn(url, func[1], () => {
        const arrt = returnExpInstance(code);
        node[event] = arrt;
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
 * @Last Modified time: 2023-08-07 22:23:36
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
    var url = null;
    cainFuc[cainStr](cainStr, (curl) => {
      url = curl;
    });
    node.innerText = result;
    setBucketFn(url, cainStr, () => {
      const result = str.replace(regex, strRegex);
      if (cainFuc[cainStr]) {
        node.innerText = result;
      }
    });
  }
};

export { cainExpression, cainStr, makeStrategy };
