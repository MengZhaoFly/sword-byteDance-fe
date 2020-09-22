## 题目描述
```js
/*
用 promise 实现以下功能。
具体： fn1和fn2都是异步函数，f1、fn2同时执行，并且fn1、fn2的结果是 fn3的参数。当fn1或者fn2发生错误时，fn3照常执行，此时的参数为空。
*/
eg:
fn1 = async() => {
 
    // 发送请求
    const data = await sendRquest1();
    return data;
}
fn2 = async() => {
 
    // 发送请求
    const data = await sendRquest2();
    return data;
}
```
## 解答
```js
function sendRquest1(t) {
 return new Promise((resolve, reject) => {
  setTimeout(() => {
   resolve(t)
  }, t)
 })
}
fn1 = async() => {
    // 发送请求
    const data = await sendRquest1(1000);
    return data;
}
fn2 = async() => {
    // 发送请求
    const data = await sendRquest1(2000);
    return data;
}
Promise.allSettled([fn1(), fn2()]).then(res => res.map(r => {
 if (r.status === 'rejected') return null;
 return r.value;
})).then(fn3)
function fn3() {
 console.log(arguments)
}
```
## Promise.allSettled 题解
方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果.

```js
Promise.allSettled1 = function (promises) {
 return new Promise((resolve, reject) => {
   let c = 0, res = [];
   for (let i = 0; i < promises.length; i ++) {
    let p = promises[i];
    p.then(r => {
        c ++;
        res[i] = {
            status: "fulfilled", value: r
        }
        if (c === promises.length) {
            resolve(res)
        }
    })
    .catch(e => {
        c ++
        res[i] = {
            status: "rejected", reason: e
        }
        if (c === promises.length) {
            resolve(res)
        }
    })
  }
 })
}
var promise1 = Promise.resolve(3);
var promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
var promises = [promise1, promise2];

Promise.allSettled1(promises).then(console.log);
```


## 出处

作者：牛客442409485号
链接：https://www.nowcoder.com/discuss/462373
来源：牛客网

作者：Penumbra
链接：https://www.nowcoder.com/discuss/487087
来源：牛客网
