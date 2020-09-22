
## 题目

薯队长写了一篇笔记草稿，请你帮忙输出最后内容。
 1.输入字符包括，"("    ,    ")"    和    "<"和其他字符。 
2.其他字符表示笔记内容。
 3.()之间表示注释内容，任何字符都无效。    括号保证成对出现。
 4."<"表示退格,    删去前面一个笔记内容字符。括号不受"<"影响    。 

输入
Corona(Trump)USA<<<Virus
输出
CoronaVirus

## 题解

错误版本：
```js
function solution(str) {
    let res = [];
    let flag = false;
    for (let val of str) {
      if (val == '(') {
            flag = true;
            continue ;
        }
        if (flag) {
            if (val == ')') {
                flag = false;
            }
            continue;
        }
        if (val == '<') {
            res.pop();
        } else {
            res.push(val);
        }
    }
    return res.join('');
}
```

处理多个括号嵌套

```js
function solution(str) {
    let res = [];
    let flag = 0;
    for (let val of str) {
      if (val == '(') {
            flag += 1;
            continue ;
        }
        if (flag) {
            if (val == ')') {
                flag -= 1;
            }
            continue;
        }
        if (val == '<') {
            res.pop();
        } else {
            res.push(val);
        }
    }
    return res.join('');
}
```

## 出处
链接：https://www.nowcoder.com/questionTerminal/0823ca800ee04706a7e2dafc837dc236
来源：牛客网