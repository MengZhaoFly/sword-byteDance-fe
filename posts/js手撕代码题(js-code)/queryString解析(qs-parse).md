## 题目
解析 URL 中的 queryString，返回一个对象 解析异常的 展示 ''
返回值示例：
```js
const testURL = 'https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D&illegal=C%9E5%H__a100373__b4';

{
  name: 'coder',
  age: '20'.
  callback: 'https://youzan.com?name=test',
  list: [a, b],
  json: {str: "abc", num: 123}, // json key 是固定
  illegal: '', // error 异常
}
```

## 题解
```js
const testURL = 'https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D&illegal=C%9E5%H__a100373__b4';
function parseQs(str) {
  let i = str.indexOf('?');
  if (i < 0) return {}
  let qs = str.slice(i + 1);
  let arr = qs.split('&');
  console.log(arr);
  return arr.reduce((pre, next) => {
    let kv = next.split('=');
    let k = kv[0];
    let v = kv[1];
    try {
      v = decodeURIComponent(v);
    } catch (error) {
      v = ''
    }
    if (k.slice(-2) === '[]') {
      k = k.slice(0, -2);
      pre[k] ? pre[k].push(v) : pre[k] = [v]
      return pre;
    }
    pre[k] = v;
    return pre
  }, {})
}
console.log(parseQs(testURL));
```


## 出处
作者：思文
公司：有赞