/*
 * @Title: 检索整个dom
 * @Dosc: 根据挂载的dom检索，判断框架语法
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-16 14:51:09
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
    directive("c-click", node.getAttribute("c-click"), node);
    const attr = node.attributes;
    for (var i = 0; i < attr.length; i++) {
      let attribute = attr[i];
      if (/^c-on:/.test(attribute.name)) {
        const strArr = attribute.nodeName.split(":");
        directive("c-on", attribute.nodeValue, node, strArr[1]);
      }
    }
  }
  for (let child = node.firstChild; child; child = child.nextSibling) {
    retrieval(child);
  }
};

/*
 * @Title: 根据str判断有没有插值表达式
 * @Dosc: 根据传入的字符串判断有没有特定的
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-15 12:26:27
 */
const strTran = (str, node) => {
  const arr = [];
  let flag = false;
  for (let i = 0; i < Number(str.length); i++) {
    if (!flag) {
      if (str[i] == "[") {
        arr.push(i);
        flag = true;
      }
    } else {
      if (str[i] == "]") {
        arr.push(i);
        flag = false;
      }
    }
  }
  const cainJs = str.slice(arr[0] + 1, arr[1]);
  if (cainFuc[cainJs]) {
    cainFuc[cainJs](cainJs);
    Object.values(bucket).forEach((v) => {
      if (v.use == cainJs) {
        node.innerText =
          str.slice(0, arr[0]) +
          cainFuc[cainJs]() +
          str.slice(arr[1] + 1, str.length);
        v.fn.push(() => {
          node.innerText =
            str.slice(0, arr[0]) +
            cainFuc[cainJs]() +
            str.slice(arr[1] + 1, str.length);
        });
      }
    });
  }
};
