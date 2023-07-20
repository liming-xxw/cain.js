/*
 * @Title: 检索整个dom
 * @Dosc: 根据挂载的dom检索，判断框架语法
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-20 17:15:22
 */
const retrieval = (node) => {
  if (node.nodeType === Node.TEXT_NODE) {
    let newText = node.textContent.replace(/^\s|\s$/g, "");
    if (newText != "") {
      // strTran(newText, node.parentNode);
      cainExpression(newText, node.parentNode);
    }
  } else {
    directive("c-for", node.getAttribute("c-for"), node);
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
