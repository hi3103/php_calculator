window.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('#calculator button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (value === 'AC') {
                display.textContent = '0';
            } else if (value === '=') {
                fetch(`/calculate.php?expression=${encodeURIComponent(display.textContent)}`)
                    .then(response => response.text())
                    .then(result => {
                        display.textContent = result;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                if (display.textContent === '0') {
                    display.textContent = value;
                } else {
                    display.textContent += value;
                }
            }
        });
    });
});
