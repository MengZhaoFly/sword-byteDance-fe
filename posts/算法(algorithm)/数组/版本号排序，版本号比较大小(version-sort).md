## 题目

版本号排序
输入 
```js
['1.1.1.1.1.1', '6', '5.4.3', '2.3.1', '2.3.1.1'] 
```

返回从大到小的版本号数组


## 解题思路

逐步拆解：
- 可以先比较出其中某两个版本号的大小关系：
如果 version1 > version2 返回 1，如果 version1 < version2 返回 -1， 除此之外返回 0。
- 借助 [sort 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

## 版本号比较大小
```js
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
  let v1 = version1.split('.'),
  v2 = version2.split('.');
  let maxLen = Math.max(v1.length, v2.length);
  for (let i = 0; i < maxLen; i ++) {
    let a = v1[i] ? v1[i] : 0, b = v2[i] ? v2[i] : 0;
    a = toNumber(a), b = toNumber(b);
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    }
  }
  return 0;
};
function toNumber(str) {
  if (typeof str === 'number') return str;
  let num = 0;
  for (let i = str.length - 1; i >= 0; i --) {
    let char = str[i];
    char = char.charCodeAt(0) - 48;
    num += char * (10 ** (str.length - 1 - i))
  }
  return num;
}
```
## 上一步通过 1， -1， 0 三个状态， 告诉 sort 方法 要不要交换位置
以 从小到大 为例：
```js
['1.1.1.1.1.1', '6', '5.4.3', '2.3.1', '2.3.1.1', '2.3.1.0', '5.4.3.2'].sort(compareVersion)
输出：
["1.1.1.1.1.1", "2.3.1", "2.3.1.0", "2.3.1.1", "5.4.3", "5.4.3.2", "6"]
```

## 出处
作者：洛霞
链接：https://www.nowcoder.com/discuss/459995
来源：牛客网