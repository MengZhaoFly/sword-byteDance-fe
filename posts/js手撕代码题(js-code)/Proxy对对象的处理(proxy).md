## 题目

![](/imgs/proxy.png)

## 题解

```js
let NONE_FUNC = () => {}
function toSafeObj(obj) {
  let handle = {
    get(target, key) {
      // console.log('-------------', target, key)
      if (target[key] !== undefined) {
        return Reflect.get(target, key)
      }
      return new Proxy(NONE_FUNC, handle);
    },
    apply(target, thisArg, argumentsList) {
      // console.log('target', target);
      if (target) {
        return Reflect.apply(target, thisArg, argumentsList)
      } else if (target === NONE_FUNC) {
        return undefined;
      }
      // return undefined;
    }
  }
  let proxyObj = new Proxy(obj, handle)
  function deepProxy(obj) {
    Object.keys(obj).forEach(k => {
      if (typeof obj[k] === 'object' || typeof obj[k] === 'function') {
        obj[k] = new Proxy(obj[k], handle);
      }
    })
  }
  deepProxy(proxyObj);
  return proxyObj;
}
let obj = {
  a: () => {
    return 1;
  },
  b: 2
}
let safe = toSafeObj(obj)
console.log(safe.b);  // 2
console.log(safe.c.d.e.f); // 新的 proxy 对象
console.log(safe.a());     // 1
console.log(safe.c());     // undefined
```

## 出处

作者：phillzou
链接：https://www.nowcoder.com/discuss/535718
来源：牛客网