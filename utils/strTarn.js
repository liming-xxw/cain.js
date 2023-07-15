/*
 * @Title: 分割方法
 * @Dosc: 分割方法
 * @Date: 2023-07-14 20:31:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-15 23:24:20
 */
const strSpliceFuc = (str, sliceOne, sliceTow) => {
  const arr = [];
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
  const val = str.slice(arr[0] + 1, arr[1]);
  return {
    fuc,
    val,
  };
};