
## 题目
二维数组，斜45度角输出：
```js
[
[1, 2, 3], 
[4, 5, 6],
[7, 8, 9],
]

// 1 4 2 7 5 3 8 6 9
```
## 题解

```js
let grid = [
 [1, 2, 3, 4, 5], 
 [4, 5, 6, 5, 6],
 [7, 8, 9, 6, 7],
 [0, 0, 0, 0, 0],
]
function log(grid) {
    let res = []
    let start = [0, 0];
    let M = grid[0].length, N = grid.length;
    while(start[0] < N) {
        let [x, y] = start
        res.push(grid[x][y]);
        while (x - 1 >= 0 && y + 1 < M) {
         res.push(grid[x - 1][y + 1]);
         x -= 1; y += 1;
        }
        start[0] += 1
    }
    start = [N - 1, 1]
    while(start[1] < M) {
        console.log(start);
        let [x, y] = start
        res.push(grid[x][y]);
        while (x - 1 >= 0 && y + 1 < M) {
         console.log(x, y, grid[x - 1][y + 1])
         res.push(grid[x - 1][y + 1]);
         x -= 1; y += 1;
        }
        start[1] += 1
    }
   return res;
}
console.log(log(grid));
// [1, 4, 2, 7, 5, 3, 0, 8, 6, 4, 0, 9, 5, 5, 0, 6, 6, 0, 7, 0]
```

## 出处
作者：lllanlll
链接：https://www.nowcoder.com/discuss/468950
来源：牛客网