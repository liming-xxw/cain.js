import { returnExpInstance } from "../package/responsive";
import { cainFuc } from "../script/index";
import { cainStr, setCainStr } from "../package/directive";
/*
 * @Title: 分割方法
 * @Dosc: 分割方法
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-08-02 17:52:25
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
 * @Title: 分割对象字符串
 * @Dosc: 根据传过来的字符串分割方法并且返回对象
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-17 08:55:21
 */
const strObject = (str) => {
  var pairs = str.slice(1, -1).split(",");
  var obj = {};
  pairs.forEach((pair) => {
    var parts = pair.split(":");
    if (parts.length == 1) {
      console.error("error");
      return false;
    }
    var key = parts[0].trim();
    var value = parts[1]?.trim();

    // 去除属性名和属性值的引号（如果存在）
    if (value?.startsWith("'") && value?.endsWith("'")) {
      value = value.slice(1, -1);
    }

    // 将属性名和属性值添加到对象中
    obj[key] = value;
  });
  return obj;
};

/*
 * @Title: 插值表达式正则匹配
 * @Dosc: 根据传入的正则数据自动运行然后将代码提取出来返回
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-15 12:26:27
 */
const strRegex = (match, capturedValue) => {
  let strArr = returnExpInstance(capturedValue);
  let cainf = strSpliceFuc(capturedValue.trim(), "(", ")");
  if (Array.isArray(strArr)) {
    strArr = `[${strArr.toString()}]`;
  }
  setCainStr(cainf.fuc);
  return JSON.stringify(strArr);
};

export { strObject, strRegex, strSpliceFuc };
