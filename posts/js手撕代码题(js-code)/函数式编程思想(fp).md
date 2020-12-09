## 题目
```js
function func1(c) {
 const a = 1
 const b = 2

 const d = a * b * c

 return a + b + c + d
}

function func2(c) {
 const a = 1
 const b = 2

 const d = a + b + c

 return a + b + c + d
}

function func3(c) {
 const a = 1
 const b = 2

 const d = a - b + c

 return a + b + c + d
}

function func4(c) {
 const a = 1
 const b = 2

 const d = a + b - c

 return a + b + c + d
}
```

## 题解
```js
function fun(makec) {
  const a = 1
  const b = 2
  return function(c) {
    let d = makec(a, b, c)
    return a + b + c + d
  }
}
let func4Simple = fun((a, b, c) => a + b - c);
let func3Simple = fun((a, b, c) => a - b + c);
let func2Simple = fun((a, b, c) => a + b + c);
let func1Simple = fun((a, b, c) => a * b * c);
console.log(func4Simple(4) === func4(4))
console.log(func2Simple(4) === func2(4))
```

## 出处
作者：吴海兵
公司：微派