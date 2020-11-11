## 题目
数组按个位数排序

## 题解
这里忽略排序的内部算法，借助 `Array.prototype.sort`
```js
let arr = [333, 22, 9999, 1000000]
arr.sort((a, b) => {
 return (a % 10) - (b % 10)
})
```
## 出处
作者：🙏求个Offer
链接：https://www.nowcoder.com/discuss/556679
来源：牛客网