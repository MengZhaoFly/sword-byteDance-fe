## 生命周期
[react-lifecycle](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

整个 react 分为 Render 阶段和 Commit 阶段。

## Render 阶段

### mount时(初始化挂载)

没有 work-in-progress
开始 于 beginWork：**传入当前Fiber节点，创建子Fiber节点**

```js
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
  // ...省略函数体
}
```
其中传参：
- current：当前组件对应的Fiber节点在上一次更新时的Fiber节点，即workInProgress.alternate
- workInProgress：当前组件对应的Fiber节点
- renderLanes：优先级相关，在讲解Scheduler时再讲解。
由于是首次渲染，是不存在当前组件对应的Fiber节点在上一次更新时的Fiber节点，即mount时current === null

```js
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {

  // update时：如果current存在可能存在优化路径，可以复用current（即上一次更新的Fiber节点）
  if (current !== null) {
    // ...省略

    // 复用current
    return bailoutOnAlreadyFinishedWork(
      current,
      workInProgress,
      renderLanes,
    );
  } else {
    didReceiveUpdate = false;
  }

  // mount时：根据tag不同，创建不同的子Fiber节点
  switch (workInProgress.tag) {
    case IndeterminateComponent: 
      // ...省略
    case LazyComponent: 
      // ...省略
    case FunctionComponent: 
      // ...省略
    case ClassComponent: 
      // ...省略
    case HostRoot:
      // ...省略
    case HostComponent:
      // ...省略
    case HostText:
      // ...省略
    // ...省略其他类型
  }
}
```
我们可以看到，根据fiber.tag不同，进入不同类型Fiber的创建逻辑
对于我们常见的组件类型，如`（FunctionComponent/ClassComponent/HostComponent）`，最终会进入`reconcileChildren`方法。

#### reconcileChildren

对于`mount`的组件，他会创建新的子Fiber节点
对于`update`的组件，他会将当前组件与该组件在上次更新时对应的Fiber节点比较（也就是俗称的Diff算法），将比较的结果生成新Fiber节点
```js
export function reconcileChildren(
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: any,
  renderLanes: Lanes
) {
  if (current === null) {
    // 对于mount的组件
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes,
    );
  } else {
    // 对于update的组件
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes,
    );
  }
}
```

从代码可以看出，和`beginWork`一样，他也是通过current === null ?区分mount与update。
不论走哪个逻辑，最终他会生成新的子Fiber节点并赋值给workInProgress.child，作为本次beginWork返回值，并作为下次`performUnitOfWork`执行时workInProgress的传参。（详情见：https://stackblitz.com/edit/js-ejvndh）

#### effectTag

我们知道，render阶段的工作是在内存中进行，当工作结束后会通知Renderer需要执行的DOM操作。要执行DOM操作的具体类型就保存在fiber.effectTag中。
比如：
```js
// DOM需要插入到页面中
export const Placement = /*                */ 0b00000000000010;
// DOM需要更新
export const Update = /*                   */ 0b00000000000100;
// DOM需要插入到页面中并更新
export const PlacementAndUpdate = /*       */ 0b00000000000110;
// DOM需要删除
export const Deletion = /*                 */ 0b00000000001000;
```



#### 结束于 completeWork
关于 beginWork 和 completeWork 的大致流程可以查看：https://stackblitz.com/edit/js-ejvndh
```js
// mount的情况

// ...省略服务端渲染相关逻辑

const currentHostContext = getHostContext();
// 为fiber创建对应DOM节点
const instance = createInstance(
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
    workInProgress,
  );
// 将子孙DOM节点插入刚生成的DOM节点中
appendAllChildren(instance, workInProgress, false, false);
// DOM节点赋值给fiber.stateNode
workInProgress.stateNode = instance;

// 与update逻辑中的updateHostComponent类似的处理props的过程
if (
  finalizeInitialChildren(
    instance,
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
  )
) {
  markUpdate(workInProgress);
}
```
mount时的主要逻辑包括三个：

- 为Fiber节点生成对应的DOM节点
- 将子孙DOM节点插入刚生成的DOM节点中 

mount时只会在rootFiber存在一个Placement effectTag。
那么commit阶段是如何通过一次插入DOM操作（对应一个Placement effectTag）将整棵DOM树插入页面的呢？

原因就在于：completeWork中的appendAllChildren方法。

由于completeWork属于“归”阶段调用的函数，每次调用appendAllChildren时都会将已生成的子孙DOM节点插入当前生成的DOM节点下。那么当“归”到rootFiber时，我们已经有一个构建好的离屏DOM树。

比如：
```js
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
ReactDOM.render(<App />,
  document.getElementById('root')
);
```
completeWork 到达最后一个节点，最外层 div 时，div 内部的元素已经插入完毕，只需一个Placement effectTag，就能将整棵 DOM 插入

### update阶段

有 work-in-progress。

满足如下情况时didReceiveUpdate === false（即可以直接复用前一次更新的子Fiber，不需要新建子Fiber）

- oldProps === newProps && workInProgress.type === current.type，即props与fiber.type不变
- !includesSomeLane(renderLanes, updateLanes)，即当前Fiber节点优先级不够，会在讲解Scheduler时介绍

当不满足时，我们就进入第二部分，和 mount 阶段一样，创新建子Fiber。


## Commit 阶段
