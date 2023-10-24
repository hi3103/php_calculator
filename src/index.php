<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/style.css">
	<title>四則演算電卓</title>
	<script src="js/script.js" defer></script>
</head>
<body>

<div class="wrapper">
	<header id="header">
		<h1>PHP Calculator</h1>
	</header>

	<main id="main">
		<div id="calculator">

			<div id="notice"></div>
			<div id="display">0</div>

			<!-- 数字のボタン -->
			<div id="number-buttons">
				<button class="btn btn-number" data-value="1">1</button>
				<button class="btn btn-number" data-value="2">2</button>
				<button class="btn btn-number" data-value="3">3</button>
				<button class="btn btn-number" data-value="4">4</button>
				<button class="btn btn-number" data-value="5">5</button>
				<button class="btn btn-number" data-value="6">6</button>
				<button class="btn btn-number" data-value="7">7</button>
				<button class="btn btn-number" data-value="8">8</button>
				<button class="btn btn-number" data-value="9">9</button>
				<button class="btn btn-number" data-value="0">0</button>
			</div>

			<!-- 演算用のボタン -->
			<div id="formula-buttons">
				<button class="btn btn-formula" data-value="/">÷</button>
				<button class="btn btn-formula" data-value="*">×</button>
				<button class="btn btn-formula" data-value="-">-</button>
				<button class="btn btn-formula" data-value="+">+</button>
				<button class="btn btn-formula" data-value="=">=</button>
			</div>

			<!-- その他操作用のボタン -->
			<div id="function-buttons">
				<button class="btn btn-function" data-value="AC">AC</button>
			</div>
		</div>
	</main>

	<footer id="footer">
		<p>Made by <a href="https://hi3103.net" target="_blank">hi3103.net</a></p>
	</footer>
</div>

</body>
</html>
