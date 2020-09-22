## 题目
```js
function Foo(){
    getName = function(){
        console.log(1)
    }
    return this;
}
Foo.getName = function(){
    console.log(2)
}
Foo.prototype.getName = function(){
    console.log(3)
}
var getName = function(){
    console.log(4)
}
function getName(){
    console.log(5)
}
// ouput:
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```
## 题解
ouput:
- Foo.getName(); // 2

- getName(); // 4, 变量 var getName 被提升到当前作用域的最顶端，函数的声明提升优先级高于函数表达式，因此表达式会覆盖函数，输出4

- Foo().getName(); // 1, 由于函数返回this, 因此全局环境下的getName函数会被覆盖为函数Foo()内部定义的getName

- getName(); // 1, 此时getName已经被覆盖

- new Foo.getName(); // 2

- new Foo().getName(); // 3, 会到Foo的原型链上找getName

- new new Foo().getName(); // 3, 拆成两步， a = new Foo(), b = new a.getName(), 同样是Foo的原型链上的getName得到执行

[运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

## 出处
作者：lucy_2015
链接：https://www.nowcoder.com/discuss/411941
来源：牛客网