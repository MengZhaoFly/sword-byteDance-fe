
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

## 出处
作者：公孙月
链接：https://www.nowcoder.com/discuss/465904
来源：牛客网