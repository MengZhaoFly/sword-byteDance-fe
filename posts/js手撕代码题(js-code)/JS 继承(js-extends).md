## 题目

填充 inherit 完成输出。

```js
function inherit() {
   
}

let animalNum = 0;
function Animal(name) {
  animalNum ++;
  this.name = name;
}
Animal.prototype.getName = function() {
  return this.name;
};
const Cat = inherit(Animal, {  
    say:function() {
        console.log(`NO${animalNum}:${this.getName()}`);
    }
});
const cat1 = new Cat('小花');
cat1.say(); // NO1:小花
```
## 题解

继承：继承属性和继承方法
```js
function inherit(Constructor, protoObj) {
   function Fn(name) {
    Constructor.call(this, name);
   }
   let parentProto = Constructor.prototype
   protoObj.constructor = Fn;
   Object.setPrototypeOf(protoObj, parentProto);
   Fn.prototype = protoObj
   return Fn;
}

let animalNum = 0;
function Animal(name) {
  animalNum ++;
  this.name = name;
}
Animal.prototype.getName = function() {
  return this.name;
};
const Cat = inherit(Animal, {  
    say:function() {
        console.log(`NO${animalNum}:${this.getName()}`);
    }
});
const cat1 = new Cat('小花');
cat1.say(); // NO1:小花
```

## 出处

作者：Nodeath_007
链接：https://www.nowcoder.com/discuss/477747
来源：牛客网