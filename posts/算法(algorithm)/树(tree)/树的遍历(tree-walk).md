## 题目
前序遍历：
step1
```js
const chapterTree = {
  name: '总章节',
  children: [
    { name: '章节一', children: [{ name: '第一节', children: [{ name: '第一小节' }, { name: '第二小节' }] }, { name: '第二节' }] },
    { name: '章节二', children: [{ name: '第三节' }, { name: '第四节' }] }]
};

function serialize(tree) {
  // TODO
}
// 测试
const result = serialize(chapterTree);
console.log(result);
// ["总章节", "章节一", "第一节", "第一小节", "第二小节", "第二节", "章节二", "第三节", "第四节"]
```js

step2

```js
改进上面的程序，输出章节号同时输出对应的序号

// ["总章节", "(1)章节一", "(1.1)第一节", "(1.1.1)第一小节", "(1.1.2)第二小节", "(1.2)第二节", "(2)章节二", "(2.1)第三节", "(2.2)第四节"]
```
## 题解
```js
var chapterTree = {
  name: '总章节',
  children: [
    { name: '章节一', children: [
     { name: '第一节', children: [{ name: '第一小节' }, { name: '第二小节' }] },
     { name: '第二节' }
     ] 
    },
    { name: '章节二', children: [{ name: '第三节' }, { name: '第四节' }] }]
};
var res = [];
function serialize(tree) {
  // TODO
  if (tree.name) {
      res.push(tree.name)
  }
  if (tree.children) {
      for (let i = 0; i < tree.children.length; i ++) {
          serialize(tree.children[i])
      }
  }
  return res;

}
// 测试
// var result = serialize(chapterTree);
// console.log(result);
// ["总章节", "章节一", "第一节", "第一小节", "第二小节", "第二节", "章节二", "第三节", "第四节"]

function serialize2(tree, prefix) {
  let res = [];
  // TODO
  if (tree.name) {
      res.push(`${prefix ? `(${prefix})` : ''}${tree.name}`);
  }
  if (tree.children) {
      for (let i = 0; i < tree.children.length; i ++) {
          let t = serialize2(tree.children[i], `${prefix ? `${prefix}.` : ''}${i + 1}`);
          res = res.concat(t);
      }
  }
  return res;

}
console.log(serialize2(chapterTree, ''));
```

## 出处
作者：logtxt
链接：https://www.nowcoder.com/discuss/391532
来源：牛客网

## 题目
后序遍历


在前端开发中，通常会把多个 js 文件合并成一个文件，以减少网络请求次数，达到优化加载速度的目的，但是当文件之间存在依赖关系时，对 js 合并的顺序，会有一定的要求，比如 A.js 依赖了 B.js，那打包后的文件，B.js 需要排在 A.js 的前面。实现一个函数`resolve(tree)`，根据 js 的依赖关系树 tree，输出合理的打包顺序的数组（结果可能不唯一，输出其中一种即可）。
```js
var tree2 = {
  name: "page.js",
  require: [
    {
      name: "A.js",
      require: [
        {
          name: "B.js",
          require: [
            {
              name: "C.js"
            }
          ]
        }
      ]
    },
    {
      name: "D.js",
      require: [
        {
          name: "C.js"
        },
        {
          name: "E.js"
        }
      ]
    }
  ]
};
resolve(tree2); //   ["C.js", "B.js", "A.js", "C.js", "E.js", "D.js", "page.js"]
```

## 题解

```js
function resolve(tree) {
 let res = [];
 function walk(node) {
  if (node.require) {
    for (let file of node.require) {
      walk(file)
    }
  }
  res.push(node.name);
 }
 walk(tree)
 return res;
}
```

## 出处
作者：ZhengjieTang
链接：https://www.nowcoder.com/discuss/463626
来源：牛客网



## 题目
```js
给定
const obj = {
  label: "c",
  value: 3,
  children: [
    { label: "a", value: 1 },
    { label: "b", value: 2 },
  ],
};
输出
let data: Data[] = [
  {label: 'a', value: 1, parentValue: 3},
  {label: 'b', value: 2, parentValue: 3},
  {label: 'c', value: 3},
]
```

## 题解
```js
const obj = {
  label: "c",
  value: 3,
  children: [
    { label: "a", value: 1 },
    {
      label: "b", value: 2,
      children: [
        {
          label: 'c', value: -1
        }
      ]
    },
  ],
};

let data = [
  { label: 'a', value: 1, parentValue: 3 },
  { label: 'b', value: 2, parentValue: 3 },
  { label: 'c', value: 3 },
]
function convert(tree) {
  let res = [];
  function walk(node, parent) {
    if (node) {
      let t = {
        label: node.label,
        value: node.value
      }
      if (parent) t.parent = parent.value
      res.push(t);
    }
    if (node.children) {
      for (let child of node.children) {
        walk(child, node);
      }
    }
  }
  walk(tree)
  return res;
}
console.log(convert(obj))
```

## 出处
作者：佳俊