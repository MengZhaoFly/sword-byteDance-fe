## 题目
数组去重
```js
/**
 *
 * @example
 * [1,'1',1]                            -> [1,'1']
 * [{a: 1}, {b: 1}, {a: 1}]             -> [{a: 1}, {b: 1}]
 * [{a: 1, b: 2}, {b: 1}, {a: 2, b: 1}] -> [{a: 1, b: 2}, {b: 1}]
 * [[1, {a: 1}], [2], [3], [1, {a: 1}]] -> [[1, {a: 1}], [2], [3]]
 */
function unique(arr) {}
```

## 题解
```js
function type(val) {
    return Object.prototype.toString.call(val).slice(8, -1)
  }
  // 可直接用 Object.is 比较的 比如 string number bool...
  const whiteList = ['Number'];
  function is_object(x, y) {
    if (Object.keys(x).length != Object.keys(y).length) return false;
    for (let prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!is(x[prop], y[prop]))
          return false;
      }
      else {
        return false;
      }
    }
    return true;
  }
  function is_Array(v1, v2) {
    if (v1.length !== v2.length) return false;
    for (let i = 0; i < v1.length; i++) {
      if (!is(v1[i], v2[i])) {
        return false;
      }
    }
    return true;
  }
  function is(val1, val2) {
    if (type(val1) !== type(val2)) {
      return false;
    }
    if (type(val1) === type(val2) && whiteList.indexOf(type(val2)) >= 0) {
      return Object.is(val1, val2);
    }
    if (type(val1) === type(val2) && type(val2) === 'Array') {
      return is_Array(val1, val2);
    }
    if (type(val1) === type(val2) && type(val2) === 'Object') {
      return is_object(val1, val2);
    }
  }
  function unique(arr) {
    let res = [];
    for (let item of arr) {
      if (!res.some(x => is(x, item))) {
        res.push(item);
      }
    }
    return res;
  }
  console.log(unique([1,'1',1]))                         
  console.log(unique([{a: 1}, {b: 1}, {a: 1}]))            
  console.log(unique([{a: 1, b: 2}, {b: 1}, {a: 2, b: 1}]))
  console.log(unique([[1, {a: 1}], [2], [3], [1, {a: 1}]]))
  console.log(unique([[1, {a: 1, b: [{c: {d: [9999]}}]}], [2], [3], [1, {a: 1, b: [{c: {d: [9999]}}]}]]))
  console.log(unique([[1, {a: 1, b: [{c: {d: [9999]}}]}], [2], [3], [1, {a: 1, b: [{c: {d: [8888]}}]}]]))
```


## 出处
作者：思文
公司：有赞