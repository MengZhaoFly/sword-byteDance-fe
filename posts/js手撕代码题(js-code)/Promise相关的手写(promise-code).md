## 题目
汇总常见的 Promise 手撕代码题 以及 Promise 变种题

## 实现 Promise.all

Promise.all用过吗，自己用promise封装一个Promise.all？要求每一个promise能并行执行，并且要保证最后的回调参数顺序与执行顺序一致
（解释：每个 promise 封装的请求不一定会按照调用顺序得到响应，可能后面调用的比前面的要快，但一样要保证最后的顺序是按照调用顺序的）

## 实现parallelAll函数
send是可以直接调用并拿到结果的函数
```js
function send(url, i){
  //向url发送请求
}
parallelAll(['/url1', '/url2']).then(value =>{
  console. log( value);
})
```

题解：可转换为 实现一个 Promise.all

## 全部完成的Promise[Promise allSettled](promise-allsettled).md

## 出处
作者：Greatiga
链接：https://www.nowcoder.com/discuss/537024
来源：牛客网
作者：Asulemoon
链接：https://www.nowcoder.com/discuss/540447
来源：牛客网
