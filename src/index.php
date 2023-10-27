<?php
function import_asset($filepath='',$type = ''){
	// 変数を定義
	$html = '';
	$filepath_str = '';
	$last_modified_time = 0;
	//引数チェック
	if (!empty($filepath) && !empty($type)) {
		// ファイル更新日を取得
		$last_modified_time = filemtime($filepath);
		// 更新日時が取得できたら
		if ($last_modified_time !== 0){
			// href/srcに出力するパスを生成
			$filepath_str = $filepath.'?v='.$last_modified_time;
			// link/scriptタグを生成
			if ($type==='css') {
				$html = '<link rel="stylesheet" href="'.$filepath_str.'">'.PHP_EOL;
			} elseif ($type==='js') {
				$html = '<script src="'.$filepath_str.'" defer></script>'.PHP_EOL;
			}
		}
	}
	//出力
	echo $html;
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=BIZ+UDPGothic&family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap&text=0123456789" rel="stylesheet">
	<?php import_asset('css/reset.css','css'); ?>
	<?php import_asset('css/style.css','css'); ?>
	<title>PHP Calculator</title>
	<?php import_asset('js/script.js','js'); ?>
</head>
<body>

<div class="wrapper">
	<header id="header">
		<h1>PHP Calculator</h1>
	</header>

	<main id="main">
		<div id="calculator">

			<div id="notice"></div>

			<div class="display">
				<div id="display-sub"></div>
				<div id="display-main">0</div>
			</div>

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
				<button class="btn btn-formula" data-value="-">−</button>
				<button class="btn btn-formula" data-value="+">＋</button>
				<button class="btn btn-formula" data-value="=">＝</button>
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
