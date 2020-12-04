
## 题目
输入：
```js
dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd') // 2020/12/01
dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd') // 2020/04/01
dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日') // 2020年04月01日
写一个日期格式化函数
const dateFormat = (dateInput, format)=>{
  // todo
}
```
## 题解
```js

const dateFormat = (dateInput, format)=>{
  // todo
  let date = [dateInput.getFullYear(), 
   dateInput.getMonth() + 1,
   dateInput.getDate()
  ]
  let match = /yyyy(.*)MM(.*)dd/g.exec(format);
  return `${date[0]}${match[1]}${date[1]}${match[2]}${date[2]}`

}
console.log(dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd')) // 2020/12/01
console.log(dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd')) // 2020/04/01
console.log(dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日')) // 2020年04月01日
// 写一个日期格式化函数
```
附录：验证 IP 地址：

```js
25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d
```

取值区间	正则表达式
0-9       \d
10-99	    [1-9]\d
100-199 	1\d{2} 
200-249	  2[0-4]\d
250-255	  25[0-5]

## 出处
作者：公孙月
链接：https://www.nowcoder.com/discuss/465904
来源：牛客网