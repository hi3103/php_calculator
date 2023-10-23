window.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('#calculator button');

    // 計算が完了したかのフラグ
    let isCalculationComplete = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (value === 'AC') {
                display.textContent = '0';
                isCalculationComplete = false; // リセット
            } else if (value === '=') {
                fetch(`/calculate.php?expression=${encodeURIComponent(display.textContent)}`)
                    .then(response => response.text())
                    .then(result => {
                        display.textContent = result;
                        isCalculationComplete = true; // 計算完了フラグをセット
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                if (isCalculationComplete || display.textContent === '0') {
                    // 計算が完了している、または表示が0の場合は新しい数字でリセット
                    display.textContent = value !== '0' ? value : '0'; // 0だけの入力でリセットしないように
                    isCalculationComplete = false; // フラグをリセット
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
                    buttonValue = '÷';
                    break;
                case '*':
                    buttonValue = '×';
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
