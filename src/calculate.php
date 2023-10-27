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
	// 計算処理を関数として定義
	function calculateSimpleExpression($expression){
		$result = null;

		// 計算式を分解して四則演算を実行
		if (strpos($expression,'+')!==false) {
			list($a,$b) = explode('+',$expression);
			$result = $a+$b;
		}
		if (strpos($expression,'-')!==false) {
			list($a,$b) = explode('-',$expression);
			$result = $a-$b;
		}
		if (strpos($expression,'*')!==false) {
			list($a,$b) = explode('*',$expression);
			$result = $a*$b;
		}
		if (strpos($expression,'/')!==false) {
			list($a,$b) = explode('/',$expression);
			if ($b==0) {
				throw new Exception("0で割ることはできません。");
			}
			$result = $a/$b;
		}

		// 計算結果が10桁を超える場合、四捨五入を行う
		if ($result!==null && strpos((string)$result,'.')!==false && strlen((string)$result) > 10) {
			$precision = 10-(strpos((string)$result,'.')+1);
			$result = round($result,$precision);
		}

		return $result;
	}

	// 受け取った計算式に対して実行
	$result = calculateSimpleExpression($expression);

	// 計算結果を返す
	if($result!==null){
		echo $result;
	}else{
		echo "Error";
	}

// 予期せぬエラーが発生した場合の処理
} catch (Throwable $e) {
	echo "Error";
}
