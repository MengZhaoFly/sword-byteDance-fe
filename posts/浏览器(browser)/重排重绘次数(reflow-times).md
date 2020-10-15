## 题目

```js
const width = DomA.offsetWidth;
// 
DomA.style.width = width + 1 + 'px'   // 不会
DomB.style.width = width + 1 + 'px'   // force layout
DomC.style.width = width + 1 + 'px'   // force layout
// layout
// 读写
```
会触发几次回流(重排) ?
3

```js
DomA.style.width = 1px;
DomB.style.width = 1px;
DomC.style.width = 1px;
```

又会触发几次回流呢 ?

```js
let el = document.getElementById('app');
el.style.width = (el.offsetWidth+1) + 'px';
el.style.width = 1 + 'px'
```
引发几次回流?几次重绘?

## 出处
作者：千叶风行
链接：https://juejin.im/post/6844904143727886344
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。