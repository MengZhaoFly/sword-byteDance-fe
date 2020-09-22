## 题目
你说说GET和POST的区别

## 题解

误区：
- GET请求没有body，只有url，请求数据放在url的querystring中；POST请求的数据在body中。

这只是 在浏览器里面的表现：
  1. 当浏览器发出一个GET请求：<a />, <script/>, <link/> 用户地址栏输入，所携带的参数 确实只能在 url 中，
  2. 当浏览器发出一个GET请求：通过 form 标签，请求的数据在body中

- POST 更安全
http 都是明文传输，都不安全。只能 上 https

如果脱离浏览器的束缚，在一个更加自由的环境里面。

GET，POST 只是一个 semantic 「语义」，
比如GET的语义就是「获取资源」，POST的语义是「处理资源」，那么在具体实现这两个方法时，就必须考虑其语义，做出符合其语义的行为。
GET因为是读取，就可以对GET请求的数据做缓存，POST 每次返回浏览器都会提示“确认重新提交表单？”

![image](https://user-images.githubusercontent.com/19408342/89257089-140bb880-d658-11ea-8bf3-fa15998e96f3.png)

从协议本身看，并没有什么限制说GET一定不能没有body，POST就一定不能把参放到URL的querystring上。
因此其实可以更加自由的去利用格式。可用了带body的GET；也可以自己开发接口让POST一半的参数放在url的querystring里，另外一半放body里；你甚至还可以让所有的参数都放Header里——可以做各种各样的定制，只要请求的客户端和服务器端能够约定好。


## 参考

- [rfc7231](https://tools.ietf.org/html/rfc7231#section-4.1)
- [大宽宽zhihu](https://www.zhihu.com/question/28586791)

## 出处
用户：牛客2376269号
链接：https://www.nowcoder.com/discuss/410320
来源：牛客网