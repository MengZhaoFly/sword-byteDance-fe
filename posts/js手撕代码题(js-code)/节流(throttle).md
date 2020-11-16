## 节流
节流两种实现

## 

```js
// 第一版
function throttle(func, wait) {
  var context, args;
  var previous = 0;

  return function() {
      var now = +new Date();
      context = this;
      args = arguments;
      if (now - previous > wait) {
          func.apply(context, args);
          previous = now;
      }
  }
}
```
```js
// 第二版
function throttle(func, wait) {
  var timeout;
  var previous = 0;

  return function() {
      context = this;
      args = arguments;
      if (!timeout) {
          timeout = setTimeout(function(){
              timeout = null;
              func.apply(context, args)
          }, wait)
      }

  }
}
```

## 参考
[JavaScript专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)

## 出处
作者：Mendia
链接：https://www.nowcoder.com/discuss/565193
来源：牛客网

