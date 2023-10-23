window.addEventListener('DOMContentLoaded', () => {
    // HTML要素を取得する
    const display = document.getElementById('display');
    const notice = document.querySelector('#notice');
    const buttons = document.querySelectorAll('#calculator button');

    // 計算が完了したかのフラグ
    let isCalculationComplete = false;

    // ボタンクリックイベント処理
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // 押されたボタンの data-value 属性を取得
            const value = button.getAttribute('data-value');

            // 表示されている最後の1文字を取得
            const lastChar = display.textContent.slice(-1);

            // 四則演算用の記号を定義
            const operators = ['+', '-', '*', '/'];

            // エラーメッセージを初期化
            notice.textContent = '';

            // ACボタンが押された場合
            if (value === 'AC') {
                display.textContent = '0';
                isCalculationComplete = false; // 計算完了フラグをリセット
            }
            // イコールボタンが押された場合
            else if (value === '=') {
                // 最初にイコールが入力された場合、受け付けない
                if (display.textContent === '0') {
                    return;
                }
                // 最後が四則演算記号で終わっている場合、受け付けない
                else if (operators.includes(lastChar)) {
                    notice.textContent = "数字を入力してください。"; // ユーザーへのメッセージを表示
                    return;
                }
                fetch(`/calculate.php?expression=${encodeURIComponent(display.textContent)}`)
                    .then(response => {
                        if (!response.ok) {
                            // サーバーからのエラーレスポンスを処理
                            throw new Error("サーバーエラーが発生しました。");
                        }
                        return response.text();
                    })
                    .then(result => {
                        display.textContent = result;
                        isCalculationComplete = true; // 計算完了フラグをセット
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        notice.textContent = error.message;  // エラーメッセージを#noticeに表示
                    });
            }
            // 数字が押された場合
            else if (!isNaN(value)) {
                if (isCalculationComplete || display.textContent === '0') {
                    display.textContent = value;
                    isCalculationComplete = false; // 計算完了フラグをリセット
                } else {
                    display.textContent += value;
                }
            }
            // 四則演算記号が押された場合
            else if (operators.includes(value)) {
                // 入力途中に演算子が2つ連続して入力された場合、最後の演算子を置き換える
                if (operators.includes(lastChar)) {
                    display.textContent = display.textContent.slice(0, -1) + value;
                }
                // 最初に演算子が入力された場合、受け付けない
                else if (display.textContent === '0') {
                    return;
                } else {
                    display.textContent += value;
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
