## 题目

如何实现JSON.stringify()

## 题解
乞丐版，逗号处理得不是很严谨
```js
function stringfy(data) {
    let str = ''
    if (typeof data !== 'object') {
        return data;
    }
    if (Array.isArray(data)) {
        str += '['
        for (let ele of data) {
            str += stringfy(ele)
            str += ','
        }
        str += ']'
    } else if (!Array.isArray(data) && typeof data === 'object') {
        str += '{'
        for (let key in data) {
            str += `"${key}"`;
            str += ':'
            str += stringfy(data[key])
            str += ','
        }
        str += '}'
    }
    return str;
}
var a = {
  a: 1,
  b: [{b: 2}, 2, 3, {c: 4}, [4, [5, [6, 7]]]]
}
console.log(JSON.stringify(a));
console.log(stringfy(a));
```

## 出处

作者：洳娅吖__
链接：https://www.nowcoder.com/discuss/475746
来源：牛客网
