## 题目
实现一个二进制加法，输入输出均为二进制字符串

```js
function binaryAdd(num1: string, num2: string): string {
  // TODO
}
//Example
binaryAdd('1010', '111') // '10001'
```

## 题解
```js
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let ans = [];
    let ca = 0;
    for(let i = a.length - 1, j = b.length - 1;i >= 0 || j >= 0; i--, j--) {
      let sum = ca;
      sum += i >= 0 ? a.charAt(i) - '0' : 0;
      sum += j >= 0 ? b.charAt(j) - '0' : 0;
      ans.push(sum % 2);
      sum >= 2 ? ca = 1 : ca = 0;
    }
    ans.push(ca == 1 ? ca : "");
    return ans.reverse().join('');
};
```


## 出处
作者：ZE明
链接：https://www.nowcoder.com/discuss/536725
来源：牛客网


