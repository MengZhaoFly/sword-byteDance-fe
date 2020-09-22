## 题目
代码题：
点亮red，停1s，点亮 yellow，停2s，点亮 green 停 4s，然后循环5次。
![image](https://user-images.githubusercontent.com/19408342/89192220-ab302c00-d5d6-11ea-820f-be2eabee7267.png)

## 题解
```js
<style>
	div {
		background-color: grey;
		display: inline-block;
		margin: 30px;
		width: 100px;
		height: 100px;
		border-radius: 50px;
		;
	}

	.green.light {
		background-color: green;
	}

	.yellow.light {
		background-color: yellow;
	}

	.red.light {
		background-color: red;
	}
</style>


<div class="red"></div>
<div class="yellow"></div>
<div class="green"></div>


<button id="next" onclick="go();">开始</button>

<script>
	function green() {
		var lights = document.getElementsByTagName("div");
		for (var i = 0; i < 3; i++)
			lights[i].classList.remove("light")
		document.getElementsByClassName("green")[0].classList.add('light')
	}
	function red() {
		var lights = document.getElementsByTagName("div");
		for (var i = 0; i < 3; i++)
			lights[i].classList.remove("light")
		document.getElementsByClassName("red")[0].classList.add('light')
	}
	function yellow() {
		var lights = document.getElementsByTagName("div");
		for (var i = 0; i < 3; i++)
			lights[i].classList.remove("light")
		document.getElementsByClassName("yellow")[0].classList.add('light')
	}

	function sleep(t) {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, t);
		})
	}

	function* go() {
		// while(true){

		// }
		for (let i = 0; i < 6; i++) {
			red();
			yield sleep(1000)
			yellow();
			yield sleep(2000)
			green();
			yield sleep(3000)
		}
	}

	function run(iterator) {
		let { value, done } = iterator.next();
		if (done)
			return;
		if (value instanceof Promise)
			value.then(() => {
				run(iterator)
			})
	}


	function co(generator) {
		return function () {
			return run(generator());
		}
	}

	go = co(go);



</script>
```


## 出处
作者：公孙月
链接：https://www.nowcoder.com/discuss/465904
来源：牛客网
