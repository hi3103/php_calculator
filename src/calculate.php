<?php
// パラメータから計算式を取得
$expression = $_GET['expression'] ?? '';

// 計算式が空の場合は処理を中断
if (empty($expression)) {
	echo "Error";
	exit;
}

// 計算結果を返却
try {
	$result = eval("return {$expression};");
	echo $result;
} catch (Throwable $e) {
	echo "Error";
}
