## 题目

实现ES5中Function原型的bind方法， 使得以下程序最后能输出'success'
```js
 function Animal(name, color) {
  this.name = name;
  this.color = color;
 }
 Animal.prototype.say = function () {
  return `I'm a ${this.color} ${this.name}`;
 };
 const Cat = Animal.bind(null, 'cat');
 const cat = new Cat('white');
 if (cat.say() === 'I\'m a white cat' && cat instanceof Cat && cat instanceof Animal) {
  console.log('success');
 }
```

## 题解

注意：
- bind 和 new 时候 对 this 的影响

```js
function f() {
    console.log(this);
}

const g = f.bind({ a: 1 });
const obj = new g;
```

- bind 后原来的原型链

```js

  Function.prototype.myBind = function() {
    let thatFunc = this;
    let bindTo = arguments[0]
    let thatArgs = Array.prototype.slice.call(arguments, 1);
    function Fn() {
      let isNewCall = this instanceof Fn;
      let thisArgs = Array.prototype.slice.call(arguments);
      return thatFunc.apply(isNewCall ? this: bindTo, thatArgs.concat(thisArgs));
    }
    Fn.prototype = Object.create(thatFunc.prototype);
    return Fn;
  }
```

## 出处

作者：ptp
链接：https://www.nowcoder.com/discuss/337035
来源：牛客网
