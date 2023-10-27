window.addEventListener('DOMContentLoaded', () => {
	// HTML要素を取得する
	const displayMain = document.getElementById('display-main');
	const displaySub = document.getElementById('display-sub');
	const notice = document.querySelector('#notice');
	const buttons = document.querySelectorAll('#calculator button');

	// 計算が完了したかのフラグ
	let isCalculationComplete = false;

	// 計算式を保存しておく変数
	let tempFormula = '';

	// 四則演算記号を定義
	const operators = ['+', '-', '*', '/'];

	// 計算処理を関数として定義
	const executeCalculation = () => {
		return fetch(`calculate.php?expression=${encodeURIComponent(tempFormula)}`)
			.then(response => {
				if (!response.ok) {
					// サーバーからのエラーレスポンスを処理
					throw new Error("サーバーエラーが発生しました。");
				}
				return response.text();
			})
	}

	// 計算式が計算可能な文字列になっているか判定する関数
	const formulaChecker = () => {
		// 正規表現用に演算子をエスケープ
		const escapedOperators = operators.map(op => {
			if (['+', '*', '.', '?', '^', '$', '|', '(', ')', '[', ']', '{', '}', '\\'].includes(op)) {
				return `\\${op}`;
			} else {
				return op;
			}
		}).join('|');

		// 正規表現のパターン
		const regexPattern = `^-?\\d+\\.?\\d*(${escapedOperators})-?\\d+\\.?\\d*$`;

		// 正規表現のオブジェクトを生成
		const regex = new RegExp(regexPattern);

		// tempFormulaが指定のパターンにマッチするかチェック
		return regex.test(tempFormula)
	}

	// 計算式の末尾が演算子で終わっているか判定する関数
	const lastCharChecker = () => {
		// 計算式の最後の1文字を取得
		const lastChar = tempFormula.slice(-1);

		// 正規表現用に演算子をエスケープ
		return operators.includes(lastChar)
	}

	// ボタンクリックイベント処理
	buttons.forEach(button => {
		button.addEventListener('click', () => {
			// 押されたボタンの data-value 属性を取得
			const value = button.getAttribute('data-value');

			// エラーメッセージを初期化
			notice.textContent = '';

			// ACボタンが押された場合
			if (value === 'AC') {
				displayMain.textContent = '0'; // ディスプレイをリセット
				displaySub.textContent = ''; // ディスプレイをリセット
				tempFormula = ''; // 計算式をリセット
				isCalculationComplete = false; // 計算完了フラグをリセット
			}
			// イコールボタンが押された場合
			else if (value === '=') {
				// 最初にイコールが入力された場合、受け付けない
				if (tempFormula === '') {
					return;
				}
				// 最後が四則演算記号で終わっている場合、受け付けない
				else if (lastCharChecker()) {
					notice.textContent = "数字を入力してください。"; // ユーザーへのメッセージを表示
					return;
				}
				// 計算可能なら実行
				else if (formulaChecker()){
					executeCalculation()
						.then(result => {
							displaySub.textContent = tempFormula;
							displayMain.textContent = result;
							tempFormula = result;
							isCalculationComplete = true; // 計算完了フラグをセット
						})
						.catch(error => {
							console.error('Error:', error);
							notice.textContent = error.message;  // エラーメッセージを#noticeに表示
						});
				}
			}
			// 数字が押された場合
			else if (!isNaN(Number(value))) {
				// 0が入力された場合
				if (Number(value) === 0) {
					// 表示されている数値が0の場合、入力を受け付けない
					if (displayMain.textContent === '0') {
						return;
					}
					// 計算完了直後の場合、ACと同じ処理を実施する
					else if(isCalculationComplete){
						isCalculationComplete = false; // 計算完了フラグをリセット
						displaySub.textContent = ''; // サブディスプレイをリセット
						displayMain.textContent = '0';
						tempFormula = '';
						return;
					}
				}
				// 新しく計算を始める場合
				if (tempFormula === '') {
					if (isCalculationComplete) {
						isCalculationComplete = false; // 計算完了フラグをリセット
					}
					tempFormula = value;
					displayMain.textContent = value;
				}
				// 最後が四則演算記号で終わっている場合
				else if (lastCharChecker()) {
					if (isCalculationComplete) {
						isCalculationComplete = false; // 計算完了フラグをリセット
					}
					displayMain.textContent = value;
					tempFormula += value;
				}
				// 上記以外
				else {
					if (isCalculationComplete) {
						isCalculationComplete = false; // 計算完了フラグをリセット
						displaySub.textContent = ''; // サブディスプレイをリセット
						tempFormula = value;
						displayMain.textContent = value;
					} else {
						// 最大10桁の制限を超えている場合、受け付けない
						if (displayMain.textContent.length >= 10) {
							notice.textContent = "入力制限があります（最大10桁まで）"; // ユーザーへのメッセージを表示
							return;
						}
						displayMain.textContent += value;
						tempFormula += value;
					}
				}
			}
			// 四則演算記号が押された場合
			else if (operators.includes(value)) {
				// 最初に演算子が入力された場合、受け付けない
				if (tempFormula === '') {
					return;
				}
				// 入力途中に演算子が2つ連続して入力された場合、最後の演算子を置き換える
				else if (lastCharChecker()) {
					tempFormula = tempFormula.slice(0, -1) + value;
					displaySub.textContent = tempFormula;
				}
				// 既に計算式が入力されている場合、計算を実行する
				else if (formulaChecker()) {
					executeCalculation()
						.then(result => {
							displayMain.textContent = result;
							tempFormula = result + value;
							displaySub.textContent = tempFormula;
							isCalculationComplete = true; // 計算完了フラグをセット
						})
						.catch(error => {
							console.error('Error:', error);
							notice.textContent = error.message;  // エラーメッセージを#noticeに表示
						});
				}
				// 上記以外
				else {
					if (isCalculationComplete) {
						isCalculationComplete = false; // 計算完了フラグをリセット
					}
					tempFormula += value;
					displaySub.textContent = tempFormula;
				}
			}
		});
	});

	// キーボードの入力を監視するイベントリスナー
	document.addEventListener('keydown', event => {
		const key = event.key;
		let buttonValue;

		if ('0' <= key && key <= '9') {
			buttonValue = key;
		} else {
			switch (key) {
				case 'Escape':
					buttonValue = 'AC';
					break;
				case '/':
					event.preventDefault(); // デフォルトの動作をキャンセル
					buttonValue = '/';
					break;
				case '*':
					buttonValue = '*';
					break;
				case '-':
					buttonValue = '-';
					break;
				case '+':
					buttonValue = '+';
					break;
				case 'Enter':
					buttonValue = '=';
					break;
			}
		}

		if (buttonValue) {
			const button = document.querySelector(`#calculator button[data-value="${buttonValue}"]`);
			button.click();  // 対応するボタンのクリックイベントをトリガー
		}
	});
});
