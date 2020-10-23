## 题目

1. 找出一个网页中标签名以 h 开头的所有元素
2. 任意打开一个网页如新浪或者百度，写一段js代码找到网页中所有以h或者H开头的元素，并打印每种元素的个数，如网页中含有head, hr 和 h2 元素，那么打印出类似如下的结果：（备注：可以上网搜索api）
```js
{
  hr: 3,
  h2: 2,
  head: 1
}
```


## 题解
```js
function findH(tree) {
   let res = [];
   function walk(node) {
     if(node.tagName && node.tagName.startsWith('H')) {
       res.push(node.tagName)
     }
     if (node.children) {
       for (let child of node.children) walk(child)
     }
   }

   walk(tree);
   return res;
}
findH(document.body)

```
检测页面最大深度，以及深度的路径
```js
function maxDeep(tree) {
        let maxDeep = Number.MIN_VALUE;
        let maxPath = null;
        function walk(node, deep, path) {
          if (node.nodeType === 1 && node.tagName) {
            let classList = [...node.classList].join('.');
            path.push(`${node.tagName}.${classList}`);
            if (deep > maxDeep) {
              maxDeep = deep;
              maxPath = path.slice(0);
            }
          }
          if (node.children) {
            deep++;
            for (let child of node.children) {
              walk(child, deep, path.slice(0))
            }
          }
        }
      
        walk(tree, 0, []);
        return {
          maxDeep,
          maxPath
        };
      }
maxDeep(document.body)
```
## 出处
作者：lucy_2015
链接：https://www.nowcoder.com/discuss/411607
来源：牛客网