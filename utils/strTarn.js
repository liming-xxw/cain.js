/*
 * @Title: 分割方法
 * @Dosc: 分割方法
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-17 08:55:21
 */
const strSpliceFuc = (str, sliceOne, sliceTow) => {
  const arr = [];
  let val = undefined;
  let flag = false;
  for (let i = 0; i < Number(str.length); i++) {
    if (!flag) {
      if (str[i] == sliceOne) {
        arr.push(i);
        flag = true;
      }
    } else {
      if (str[i] == sliceTow) {
        arr.push(i);
        flag = false;
      }
    }
  }
  const fuc = str.slice(0, arr[0]);
  if (arr.length == 2) {
    val = str.slice(arr[0] + 1, arr[1]);
  }

  return {
    fuc,
    val,
  };
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
