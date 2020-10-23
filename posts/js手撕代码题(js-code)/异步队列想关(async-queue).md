## 题目
设计一个简单的任务队列, 要求分别在 1,3,4 秒后打印出 "1", "2", "3"

```js
new Queue()
  .task(1000, () => {
    console.log(1);
  })
  .task(2000, () => {
    console.log(2);
  })
  .task(1000, () => {
    console.log(3);
  })
  .start();
```

## 题解
```js
class Queue {
  constructor() {
    this.tasks = [];
  }
  task(time, cb) {
    const createTask = time => () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    };
    this.tasks.push({
      task: createTask(time),
      cb
    });
    return this;
  }
  start() {
    (async () => {
      for (let {task, cb} of this.tasks ) {
        await task()
        cb()
      }
    })()
  }
}
```

## 题目


用类+任务队列实现

```js
实现一个CodingMan，可以按照以下方式调用:
CodingMan("Hank")
输出:
Hi! This is Hank!

CodingMan("Hank").sleep(10).eat("dinner")
输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

CodingMan("Hank").eat("dinner").eat("supper")
输出
Hi This is Hank!
Eat dinner~
Eat supper~

CodingMan("Hank").sleepFirst(5).eat("supper")
输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
以此类推。
```
## 题解

https://github.com/Peterlhx/LazyMan/blob/master/lazyMan.js

## 出处
作者：前端菜🐦
链接：https://www.nowcoder.com/discuss/528644
来源：牛客网