## Commit 阶段

在rootFiber.firstEffect上保存了一条需要执行副作用的Fiber节点的单向链表effectList，这些Fiber节点的updateQueue中保存了变化的props。

这些副作用对应的DOM操作在commit阶段执行。

除此之外，一些生命周期钩子（比如componentDidXXX）、hook（比如useEffect）需要在commit阶段执行。


分为:
- before mutation （执行DOM操作前）
- mutation（执行DOM操作）
- layout（执行DOM操作后）

三个阶段

## before mutation
before mutation阶段，遍历effectList并调用commitBeforeMutationEffects函数处理。
commitBeforeMutationEffects
大体代码逻辑：

```js
function commitBeforeMutationEffects() {
  while (nextEffect !== null) {
    const current = nextEffect.alternate;

    if (!shouldFireAfterActiveInstanceBlur && focusedInstanceHandle !== null) {
      // ...focus blur相关
    }

    const effectTag = nextEffect.effectTag;

    // 调用getSnapshotBeforeUpdate
    if ((effectTag & Snapshot) !== NoEffect) {
      commitBeforeMutationEffectOnFiber(current, nextEffect);
    }

    // 调度useEffect
    if ((effectTag & Passive) !== NoEffect) {
      if (!rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = true;
        scheduleCallback(NormalSchedulerPriority, () => {
          flushPassiveEffects();
          return null;
        });
      }
    }
    nextEffect = nextEffect.nextEffect;
  }
}
整体可以分为三部分：

- 处理DOM节点渲染/删除后的 autoFocus、blur 逻辑。
- 调用getSnapshotBeforeUpdate生命周期钩子。
- 调度useEffect。

调度useEffect: 在这几行代码内，scheduleCallback方法由Scheduler模块提供，用于以某个优先级异步调度一个回调函数。
为什么要异步（而不是同步）调度useEffect:
![effect 的执行时机](https://zh-hans.reactjs.org/docs/hooks-reference.html#timing-of-effects)
```

## mutation
mutation阶段也是遍历effectList，执行函数。这里执行的是commitMutationEffects。
```js
function commitMutationEffects(root: FiberRoot, renderPriorityLevel) {
  // 遍历effectList
  while (nextEffect !== null) {

    const effectTag = nextEffect.effectTag;

    // 根据 ContentReset effectTag重置文字节点
    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect);
    }

    // 更新ref
    if (effectTag & Ref) {
      const current = nextEffect.alternate;
      if (current !== null) {
        commitDetachRef(current);
      }
    }

    // 根据 effectTag 分别处理
    const primaryEffectTag =
      effectTag & (Placement | Update | Deletion | Hydrating);
    switch (primaryEffectTag) {
      // 插入DOM
      case Placement: {
        commitPlacement(nextEffect);
        nextEffect.effectTag &= ~Placement;
        break;
      }
      // 插入DOM 并 更新DOM
      case PlacementAndUpdate: {
        // 插入
        commitPlacement(nextEffect);

        nextEffect.effectTag &= ~Placement;

        // 更新
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // SSR
      case Hydrating: {
        nextEffect.effectTag &= ~Hydrating;
        break;
      }
      // SSR
      case HydratingAndUpdate: {
        nextEffect.effectTag &= ~Hydrating;

        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // 更新DOM
      case Update: {
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // 删除DOM
      case Deletion: {
        commitDeletion(root, nextEffect, renderPriorityLevel);
        break;
      }
    }

    nextEffect = nextEffect.nextEffect;
  }
}
```
方法的主要工作为“根据effectTag调用不同的处理函数处理Fiber

## layout阶段

与前两个阶段类似，layout阶段也是遍历effectList，执行函数。
具体执行的函数是commitLayoutEffects。
commitLayoutEffectOnFiber方法会根据fiber.tag对不同类型的节点分别处理
- 对于ClassComponent，他会通过current === null?区分是mount还是update，调用componentDidMount (opens new window)或componentDidUpdate
- 对于FunctionComponent及相关类型，他会调用useLayoutEffect hook的回调函数，调度useEffect的销毁与回调函数

注：useEffect需要先调度，在Layout阶段完成后再异步执行，
useLayoutEffect 是同步执行的

完成current Fiber树切换
```js
root.current = finishedWork;
```