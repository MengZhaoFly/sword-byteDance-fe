## 题解

1. 递归基础版本

```js
function cloneDeep(obj) {
  let t = {};
  Object.keys(obj).forEach(k => {
    if (typeof obj[k] === 'object') {
      t[k] = cloneDeep(obj[k])
    } else {
      t[k] = obj[k];
    }
  })
  return t
}
```

2. 处理循环引用版本

```js
let a = {tt: 11}
a.t = a;
function cloneDeep(obj, map = new Map()) {
  let t = {};
  if (map.get(obj)) {
    return map.get(obj);
  }
  map.set(obj, t);
  Object.keys(obj).forEach(k => {
    if (typeof obj[k] === 'object') {
      t[k] = cloneDeep(obj[k], map);
    } else {
      t[k] = obj[k];
    }
  })
  return t;
}
console.log(cloneDeep(a));
```

3. 处理多类型版本

```js
/*
Array Object function Map Set Date RegExp
*/
function cloneSet(set) {
  let t = new Set();
  set.forEach(v => {
    t.add(clone(v));
  })
  return t;
}
// Map  for
function cloneArray(arr) {
  let t = [];
  arr.forEach(v => {
    t.push(clone(v))
  })
  return t;
}
function cloneReg(targe) {
  const result = new RegExp(targe.source, targe.flags);
  result.lastIndex = targe.lastIndex;
  return result;
}
function cloneObj(obj) {
  let t = {};
  Object.keys(obj).forEach(k => {
    t[k] = clone(obj[k]);
  })
  return t
}
function cloneFun(func) {
  const funcString = func.toString();
  let paramReg = /\((.+)\)/;
  let bodyReg = /(?<={)(.|\n)+(?=})/m;
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[1].split(',');
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}
function cloneMap(map) {
    let t = new Map();
    for (let key of map.keys()) {
      t.set(key, clone(map.get(key)));
    }
    return t;
}
function cloneDate(date) {
    return new Date(date);
}
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';


const needClone = {
  '[object Set]': cloneSet,
  '[object Array]': cloneArray,
  '[object RegExp]': cloneReg,
  '[object Object]': cloneObj,
  '[object Function]': cloneFun,
  '[object Map]': cloneMap,
  '[object Date]': cloneDate
}
const whiteList = ['[object String]', '[object Number]']
function getType(target) {
  return Object.prototype.toString.call(target);
}
function clone(data) {
  let type = getType(data)
  if (whiteList.includes(type)) return data;
  return needClone[type](data)
}

let c = function(a, b) { return a + b }
let data = { obj: { a: 1 }, b: [1], c: /[a-z]/, fun: c}
let data1 = clone(data);
data1.b.push(2);
console.log(data1, data);
console.log(data1.c === data.c);
console.log(data1.fun === data.fun, data1.fun(1,2));
```
上面的 都是深度优先。

4. 层序遍历版本

```js
/**
var a = {
    a1: 1,
    a2: {
        b1: 1,
        b2: {
            c1: 1
        }
    }
}
    a
  /   \
 a1   a2        
 |    / \         
 1   b1 b2     
     |   |        
     1  c1
         |
         1       
*/
var a = {
  a1: 1,
  a2: {
      b1: 1,
      b2: {
          c1: 1
      }
  }
}
function cloneLoop(x) {
  let queue = [];
  let root = {};
  Object.keys(x).forEach(k => {
    queue.push({
      key: k,
      value: x[k],
      parent: root
    })
  })
  while (queue.length !== 0) {
    let node = queue.shift();
    let { key, value, parent } = node;
    // a2
    if (typeof value === 'object') {
      // parent[a2] = {}
      if (!parent[key]) parent[key] = {}
      Object.keys(value).forEach(k => {
        queue.push({
          key: k,
          value: value[k],
          parent: parent[key]
        })
      })
    } else {
      parent[key] = value;
    }
  }
  return root;
}
console.log(cloneLoop(a), cloneLoop(a).a2 === a.a2);
```