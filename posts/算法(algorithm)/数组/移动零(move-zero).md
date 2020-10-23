## 题目
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:

输入: [0,1,0,3,12]
输出: [1,3,12,0,0]

## 题解
```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  // function swap(i, j) {
  //   [nums[i], nums[j]] = [nums[j], nums[i]];
  // }
  // for (let i = 0; i < nums.length; i ++) {
  //   if (nums[i] === 0) {
  //     for (let j = i; j < nums.length; j ++) {
  //       if (nums[j] !== 0) {
  //         swap(i, j);
  //         break;
  //       }
  //     }
  //   }
  // }
  let count = 0;
  for (let i = 0; i < nums.length; i ++) {
    if (nums[i] !== 0) {
      nums[count] = nums[i];
      count ++;
    }
  }
  for (let i = count; i < nums.length; i ++) {
    nums[i] = 0;
  }
  return nums;
};
```

## 题目
作者：ZhengjieTang
链接：https://www.nowcoder.com/discuss/463626
来源：牛客网