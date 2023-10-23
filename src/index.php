<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>四則演算電卓</title>
    <script src="script.js" defer></script>
</head>
<body>

<div id="calculator">
    <div id="display">0</div>

    <!-- 数字のボタン -->
    <div id="number-buttons">
        <button data-value="1">1</button>
        <button data-value="2">2</button>
        <button data-value="3">3</button>
        <button data-value="4">4</button>
        <button data-value="5">5</button>
        <button data-value="6">6</button>
        <button data-value="7">7</button>
        <button data-value="8">8</button>
        <button data-value="9">9</button>
        <button data-value="0">0</button>
    </div>

    <!-- 演算用のボタン -->
    <div id="operation-buttons">
        <button data-value="/">÷</button>
        <button data-value="*">×</button>
        <button data-value="-">-</button>
        <button data-value="+">+</button>
        <button data-value="=">=</button>
        <button data-value="AC">AC</button>
    </div>

</div>

</body>
</html>
