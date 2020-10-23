## 题目
二叉树所有路径

## 题解
https://leetcode-cn.com/problems/binary-tree-paths/
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  let res = [];
  function walk(node, path) {
    if (!node) return;
    let val = node.val;
    path.push(val);
    // 叶子节点
    if (!node.left && !node.right) {
      res.push(path.join('->'));
      return;
    }
    walk(node.left, path.slice(0));
    walk(node.right, path.slice(0));
  }
  walk(root, [])
  return res;
}
```

## 出处
作者：牛客871521627号
链接：https://www.nowcoder.com/discuss/545994
来源：牛客网


