
## 题目
输入一个数组都是字符，输出一个新数组
```js
input: const arrest = ["a","a","b","b","c"]
output: ["a","2","b","2","c","1"]
```
## 题解
https://leetcode-cn.com/problems/string-compression/
```js
/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
  if (chars.length <= 1) return chars.length;
  // 当数字不相等的时候 该在哪写入数量指针
  // readPos 当前遍历到的索引指针
  let writePos = 0, count = 0,readPos = 0;
  while (readPos < chars.length + 1) {
    if (chars[writePos] === chars[readPos]) {
      count ++;
      readPos ++;
    } else {
      if (count > 1) {
        let countStr = count.toString().split('');
        for (let c of countStr) {
          writePos ++;
          chars[writePos] = c;
        }
        writePos ++;
        chars[writePos] = chars[readPos]
      } else {
        writePos ++;
        chars[writePos] = chars[readPos]
      }
      count = 0;
    }
  }
  return writePos;
};
```

## 出处
作者：超级中华小子
链接：https://www.nowcoder.com/discuss/547095
来源：牛客网