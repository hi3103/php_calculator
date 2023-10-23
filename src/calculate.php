<?php
$expression = $_GET['expression'] ?? '';

// 簡易的なエラーハンドリング
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
?>
