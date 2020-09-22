
## 题目
实现一个方法 function resolve(baseUrl: string, moduleId: string): string {}
```js
resolve('http://www.baidu.com', 'a/b/c'); 
简化为-> http://www.baidu.com/a/b/c
resolve('http://www.baidu.com', 'a/../c'); 
简化为-> http://www.baidu.com/c
resolve('http://www.baidu.com/1/2', 'a/.././c'); 
简化为-> http://www.baidu.com/1/2/c
```

## 出处
作者：haha233333
链接：https://www.nowcoder.com/discuss/459109
来源：牛客网