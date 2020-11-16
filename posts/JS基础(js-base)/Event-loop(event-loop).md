## 题目

```js
document.body.addEventListener('click', () => {
 Promise.resolve().then(()=>console.log(1));
 console.log(2)
});
document.body.addEventListener('click', () => {
 Promise.resolve().then(()=>console.log(3));
 console.log(4)
});
用鼠标点击一下屏幕，输出结果是什么；为什么？事件循环是什么，微任务是什么，他们的执行顺序是什么样？哪些你知道的方法是微任务？
```
 2 1 4 3
```js
console.log(1)

setTimeout(function() {
  console.log(2)
})

new Promise(function (resolve) {
  console.log(3)
  resolve()
 }).then(function () {
  console.log(4)
}).then(function() {
  console.log(5)
})

console.log(6)
```
答案是：1、3、6、4、5、2


```js
async function foo() {
  await bar();
  console.log(1);
}
async function bar() {
 console.log(0)
 Promise.resolve(3).then(console.log)
 return new Promise((resolve, reject) => {
   console.log(2)
   resolve();
 })
}
foo()
```
0 2 3 1

```js
async function foo() {
  await bar();
  console.log(1);
}
async function bar() {
 console.log(0)
 Promise.resolve(3).then(console.log)
 return new Promise((resolve, reject) => {
   console.log(2)
   setTimeout(() => { resolve() })
 })
}
Promise.resolve(4).then(console.log)
foo()
```
0 2 4 3 1

```js
async function async1() {
 console.log('async1 start');
   await async2();
  //  new Promise((resolve, reject) => {
  //    Promise.resolve().then(resolve)
  //  }).then(() => {
  //    console.log('async1 end')
  //  })
 console.log('async1 end')
}
async function async2() {
 console.log('async2 start');
 return new Promise((resolve, reject) => {
  resolve();
  console.log('async2 promise');
 })
}
console.log('script start');
setTimeout(function() {
 console.log('setTimeout');
}, 0);  
async1();
new Promise(function(resolve) {
 console.log('promise1');
 resolve();
}).then(function() {
 console.log('promise2');
}).then(function() {
 console.log('promise3');
});
console.log('script end');
```

script start
async1 start
async2 start
async2 promise
promise1
script end
promise2
promise3
async1 end
setTimeout