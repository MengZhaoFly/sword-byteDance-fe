## 题目

写一个题吧
```js
const obj = {a: {b : {c : {d: 3}}}}
 
function getValue(obj, str, defaultValue) {}
 
getValue(obj, 'a.b.c.d', 1) => 3 (存在该属性返回该属性对应的值)
 
getValue(obj, 'a.b.c.d.e', 1) => 1 (出现错误返回传入的默认值)
```

改动，能处理数组

```
const obj_1 = {a: {b : {c : {d: [{e : 4}]}}}}
getValue(obj_1, 'a.b.c.d[0].e', 1) => 4
```
## 题解
```js
function getValue(obj, path, defaultValue) {
  if (path.includes(']')) {
    path = path.replace(']', '').replace('[', '.')
  }
  let str = path.split('.');
  for(let i = 0; i < str.length; i++) {
      if(obj && obj.hasOwnProperty && obj.hasOwnProperty(str[i])) {
          obj = obj[str[i]];
      } else {
          return defaultValue;
      }
  }
  return obj;
}

const obj = { a: {b: {c: { d: 3 }}}}

console.log(getValue(obj, 'a.b.c.d', 1))
```

## 出处
作者：Greatiga
链接：https://www.nowcoder.com/discuss/537024
来源：牛客网