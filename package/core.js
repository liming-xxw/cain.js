import { cainExpression,makeStrategy } from "./directive";
/*
 * @Title: 检索整个dom
 * @Dosc: 根据挂载的dom检索
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-22 09:31:49ƒ
 */
const retrieval = (node) => {
  if (node.nodeType === Node.TEXT_NODE) {
    let newText = node.textContent.replace(/^\s|\s$/g, "");
    if (newText.trim() != "") {
      cainExpression(newText, node.parentNode);
    }
  } else {
    makeStrategy("c-if",node.getAttribute("c-if"), node)
    makeStrategy("c-for", node.getAttribute("c-for"), node);
    makeStrategy("c-show", node.getAttribute("c-show"), node);
    makeStrategy("c-text", node.getAttribute("c-text"), node);
    const attr = node.attributes;
    for (var i = 0; i < attr.length; i++) {
      let attribute = attr[i];
      if (/^c-on:/.test(attribute.name)) {
        const strArr = attribute.nodeName.split(":");
        makeStrategy("c-on", attribute.nodeValue, node, strArr[1]);
      }
      if (/^c-bind:/.test(attribute.name)) {
        const strArr = attribute.nodeName.split(":");
        makeStrategy("c-bind", attribute.nodeValue, node, strArr[1]);
      }
    }
  }
  for (let child = node.firstChild; child; child = child.nextSibling) {
    retrieval(child);
  }
};

export { retrieval };
