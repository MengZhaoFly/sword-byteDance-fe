## 题目
实现一个带并发限制的异步调度器，保证同时最多运行2个任务
```js
class Scheduler {
  add(promiseCreator) { ... }
  // ...
}
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()

const addTask = (time, order) => {
  scheduler
  .add(() => timeout(time))
  .then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// output: 2 3 1 4
// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4
```
## 题解
```js
class Scheduler {
  constructor(limit = 2) {
    this.remainTasks = [];
    this.alive = 0;
    this.limit = limit;
  }
  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      this.remainTasks.push({
        promise: promiseCreator,
        onResolve: resolve
      })
      this.requestTask();
    })
  }
  requestTask() {
    if (this.remainTasks.length === 0) return;
    while (this.alive < this.limit && this.remainTasks.length > 0) {
      let task = this.remainTasks.shift();
      let { promise, onResolve } = task;
      promise().then(() => {
        onResolve();
        this.alive --;
        this.requestTask();
      })
      this.alive ++;
    }
  }
}
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()

const addTask = (time, order) => {
  console.time(order)
  scheduler
    .add(() => {
      return  timeout(time)
    })
    .then(() => {
      console.timeEnd(order);
      console.log(order)
    })
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
```

## 出处
作者：牛客475057040号
链接：https://www.nowcoder.com/discuss/554201
来源：牛客网