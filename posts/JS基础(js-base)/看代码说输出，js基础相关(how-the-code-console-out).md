## this
```js
var a = function () {
     this.b =3;
}
var c = new a();
a.prototype.b = 9;
var b = 7;
a();

console.log(b);
console.log(c.b); 
```

### addEventListener
```js
window.data = 5;
   var foo = {
    data: 6,
    click: () {
     console.log(this.data);
    }
   };
 
div.addEventListener('click', foo.click); // this 指向 div
 
var bar = foo.click;
bar();   // this 指向 window
```

### new 的 时候 this 指向
```js
window.name = 'ByteDance';
function A () {
   console.log(this.name);
   this.name = 123;
}
A.prototype.getA = function(){
        console.log(this);
        return this.name + 1;
}
A.prototype.name = 456;
let a = new A();     // 456
let funcA = a.getA;
console.log(funcA());   // window ByteDance1
```

## 基础语法

### 箭头函数

```js
var func1 = x => x;
var func2 = x => {x};
var func3 = x => ({x});
console.log(func1(1));
console.log(func2(1));
console.log(func3(1));
// 结果
1
undefined
{x: 1}
```

## 异步

```js
for (var i = 0; i < 6; i++) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000);
}
// 1000ms 之后输出 6 个相同的时间
```
