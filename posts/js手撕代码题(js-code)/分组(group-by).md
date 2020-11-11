## 题目
```js
//实现以下输出
let inArr = [
  {
      company: 'COM1',
      customer: 'CUS1'
  },
  {
      company: 'COM1',
      customer: 'CUS2',
  },
  {
      company: 'COM2',
      customer: 'CUS3'
  }
]
let outArr = [
  {
      company: 'COM1',
      custome: ['CUS1', 'CUS2']
  },
  {
      company: 'COM2',
      custome: ['CUS3']
  }
]
```
## 题解
lodash 里面的 groupBy
```js
function myGroupBy(array, arg) {
  var obj = {};
  for (let i = 0; i < array.length; i ++) {
    let item = array[i];
    let res;
    if (typeof(arg) === 'string') {
      res = item[arg];
    } else {
      res = arg(item);
    }
    if (obj[res] === undefined) {
      obj[res] = []
    }
    obj[res].push(item);
  }
  return obj;
}
```

## 出处
作者：累了来杯jvav
链接：https://www.nowcoder.com/discuss/561850
来源：牛客网

