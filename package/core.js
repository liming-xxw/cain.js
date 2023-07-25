/*
 * @Title: 检索整个dom
 * @Dosc: 根据挂载的dom检索，判断框架语法,加入flag参数这样可以自定义创建的数据域
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-22 09:31:49ƒ
 */
const retrieval = (node, flag) => {
  if (node.nodeType === Node.TEXT_NODE) {
    let newText = node.textContent.replace(/^\s|\s$/g, "");
    if (newText != "") {
      cainExpression(newText, node.parentNode, flag);
    }
  } else {
    directive("c-for", node.getAttribute("c-for"), node, flag);
    directive("c-if", node.getAttribute("c-if"), node, flag);
    directive("c-text", node.getAttribute("c-text"), node, flag);
    const attr = node.attributes;
    for (var i = 0; i < attr.length; i++) {
      let attribute = attr[i];
      if (/^c-on:/.test(attribute.name)) {
        const strArr = attribute.nodeName.split(":");
        directive("c-on", attribute.nodeValue, node, strArr[1], flag);
      }
      if (/^c-bind:/.test(attribute.name)) {
        const strArr = attribute.nodeName.split(":");
        directive("c-bind", attribute.nodeValue, node, strArr[1], flag);
      }
    }
  }
  for (let child = node.firstChild; child; child = child.nextSibling) {
    retrieval(child, flag);
  }
};
