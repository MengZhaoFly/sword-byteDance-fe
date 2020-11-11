## 题目
实现flat
```js
flat(arr, deep)
```

## 题解

```js
let a = [1, 2, [3, [4, [5]]]]
a.push(a);
let map = new Map();

function flat(arr, deep) {
  function flatWithDeep(arr, i) {
    if (i === deep) return arr;
    let res = [];
    if (map.get(arr)) return map.get(arr);
    map.set(arr, res);
    for (let item of arr) {
      if (Array.isArray(item)) {
        res.push(...flatWithDeep(item, i + 1))
      } else {
        res.push(item);
      }
    }
    return res;
  }
  return flatWithDeep(arr, 0)
}
console.log(flat(a, 2));
```

## 出处
作者：前向け、ニート
链接：https://www.nowcoder.com/discuss/542234
来源：牛客网



## 题目
数组扁平化？至少两种方法实现

## 题解
```js
function flat(array) {
  let stack = [...array];
  let res = []
  while(stack.length) {
    let item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      res.unshift(item);
    }
  }
  return res;
}
```

## 出处
作者：Greatiga
链接：https://www.nowcoder.com/discuss/537024
来源：牛客网
