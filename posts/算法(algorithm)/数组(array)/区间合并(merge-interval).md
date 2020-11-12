## 题目
请写一个函数，完成以下功能
输入：字符串'1, 2, 3, 5, 7, 8, 10'
输出：字符串'1~3, 5, 7~8, 10'

## 题解
```js
let a = '0,1,4,5,6,7,8,9,99,101';
function merge(s) {
  let arr = s.split(',').map(x => Number(x));
  let i = 1;
  let pre = arr[0], init = arr[0];
  let str = '';
  while (i < arr.length) {
    let current = arr[i];
    if (current === pre + 1) {
      pre = current;
      i++;
    } else {
      str += init === pre ? `${pre},` : `${init}~${pre},`
      init = pre = current;
      i++;
    }
    if (i === arr.length) {
      str += init === pre ? `${pre},` : `${init}~${pre},`
    }
  }
  return str;
}
console.log(merge(a));
// 0~1,4~9,99,101,
```
## 出处
作者：累了来杯jvav
链接：https://www.nowcoder.com/discuss/561850
来源：牛客网
