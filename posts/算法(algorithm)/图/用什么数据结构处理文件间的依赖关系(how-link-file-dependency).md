## 题目
用什么数据结构处理文件间的依赖关系，如何找到循环依赖

## 题解
```js
const graph = {
  nodes: [
    { id: 0, name: 'foo.ts', children: [1] },
    { id: 1, name: 'bar.ts', children: [2, 3] },
    { id: 2, name: 'baz.ts', children: [0] },
    { id: 3, name: 'baz2.ts', children: [1] }
  ]
}
let map = new Map();
function walk(id) {
  let node = graph.nodes.find(node => node.id === id);
  if (!node) return;
  if (map.has(node)) {
    console.log('循环', node)
    return;
  };
  map.set(node, true)
  if (node.children) {
    for (let child of node.children) {
      walk(child);
    }
  }
}
walk(0);
```

## 出处
作者：前向け、ニート
链接：https://www.nowcoder.com/discuss/542234
来源：牛客网