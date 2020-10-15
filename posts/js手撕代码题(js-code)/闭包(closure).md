## 题目
不得借助全局变量
1. 实现一个 getPrime 
```js
getPrime() //2
getPrime() //3
getPrime() //5
```

2. 实现 a
```js
a(); // 1
a(); // 2
a(); // 1
a(); // 2
```

## 题解
```js
function makePrime() {
  let val = 1;
  function isPrime(v) {
    let arr = []
    for (let i = 1; i <= v; i ++) {
      if (v % i === 0) arr.push(i)
    }
    return arr.length === 2 && arr[0] === 1 && arr[1] === v;
  }
  return function() {
    val ++;
    while(!isPrime(val)) {
      val ++;
    }
    return val;
  }
}
getPrime() //2
getPrime() //3
getPrime() //5
```


## 出处

作者：ZE明
链接：https://www.nowcoder.com/discuss/536725
来源：牛客网