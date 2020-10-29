## 题目

编程题：将数组转成树形结构的对象

## 题解

两个假设：
- 第一项 就是 root
- 给到的就是一个 按照深度 优先的数组

```js
var locationList = [
    { id: 0, name: "中国" },
    { id: 1, pid: 0, name: "北京市" },
    { id: 2, pid: 1, name: "昌平区" },
    { id: 3, pid: 1, name: "海淀区" },
  ];

  var res = trans(locationList)
  console.log(res);
  function trans(arr) {
    let root = arr.shift();
    function insertChild(pid, child) {
      function walk(node) {
        if (!node) return;
        if (node.id === pid) {
          if (!node.sub) node.sub = [];
          node.sub.push(child);
          return;
        }
        if (node.sub) {
          for (let c of node.sub) {
            walk(c);
          }
        }
      }
      walk(root);
    }
    for (let child of arr) {
      let { id, pid } = child
      insertChild(pid, child);
    }
    return root;
  }
```

## 出处

作者：daemonゞ
链接：https://www.nowcoder.com/discuss/500015
来源：牛客网
