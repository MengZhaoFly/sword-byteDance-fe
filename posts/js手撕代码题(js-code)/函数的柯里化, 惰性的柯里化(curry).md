## 题目

### 普通 curry：
手写一个函数的柯里化，实现下面功能：
- sum(1,2,3,4,5)   sum(1,2,3)(4,5)  sum(1)(2)(3)(4)(5)  结果都是15。

### 惰性 curry 之所以叫惰性，因为调用 sumOf 才显示地求值：
手写一个函数的柯里化，实现下面功能：
- add(2,3,4).sumOf()
- add(2)(3,4).sumOf()
- add(2)(3)(4).sumOf()
- add(2,3)(4).sumOf()

## 题解
普通 curry
```js
function curry(func) {
  let len = func.length, args = [];
  function combine(...arg) {
    args = args.concat(arg);
    if (args.length >= len) {
     let res = func(...args);
     args = [];
     return res;
    } else {
     return combine;
    }
  }
  return combine;
}

let sum = (a, b, c, d, e) => a + b + c + d + e;
let csum = curry(sum)
console.log(csum(1,2)(3,4)(5));
console.log(csum(1,2,3,4,5));
console.log(csum(1,2,3)(4)(5));
```
惰性 curry 
```js
function curry(func) {
  let len = func.length, args = [];
  function combine(...arg) {
    args = args.concat(arg);
    return combine;
  }
  combine.sumOf = function() {
    if (args.length >= len) {
     let res = func(...args);
     args = [];
     return res;
    } else {
      throw new Error(`args is ${JSON.stringify(args)}`);
    }
  }
  return combine;
}

let sum = (a, b, c) => a + b + c ;
let csum = curry(sum);
console.log(csum(1,2)(3).sumOf());
console.log(csum(1,2,3).sumOf());
console.log(csum(1,5)(2).sumOf());
```
## 出处
作者：我是你找不到的小铭
链接：https://www.nowcoder.com/discuss/452433
来源：牛客网

