## 题目
实现 trim

## 题解
找到开始的空格 和 结尾的空格
```js
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
}
```