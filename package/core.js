/*
 * @Title: 检索整个dom
 * @Dosc: 根据挂载的dom检索，判断框架语法
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-19 22:16:26
 */
const retrieval = (node) => {
  if (node.nodeType === Node.TEXT_NODE) {
    let newText = node.textContent.replace(/^\s|\s$/g, "");
    if (newText != "") {
      strTran(newText, node.parentNode);
    }
  } else {
    // directive(node.getAttribute("c-for"), node);
    directive("c-if", node.getAttribute("c-if"), node);
    directive("c-text", node.getAttribute("c-text"), node);
    const attr = node.attributes;
    for (var i = 0; i < attr.length; i++) {
      let attribute = attr[i];
      if (/^c-on:/.test(attribute.name)) {
        const strArr = attribute.nodeName.split(":");
        directive("c-on", attribute.nodeValue, node, strArr[1]);
      }
      if (/^c-bind:/.test(attribute.name)) {
        const strArr = attribute.nodeName.split(":");
        directive("c-bind", attribute.nodeValue, node, strArr[1]);
      }
    }
  }
  for (let child = node.firstChild; child; child = child.nextSibling) {
    retrieval(child);
  }
};

/*
 * @Title: 执行函数方法
 * @Dosc: 根据传递的函数方法，然后用with的特性，实现执行函数
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.cain
 * @Last Modified time: 2023-07-17 09:01:42
 */
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

const returnExpInstance = (func) => {
  let expInstance = new createExpInstance();
  let code = expInstance.executeCode(func);
  return code;
};
