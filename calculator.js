document.addEventListener('DOMContentLoaded', function() {
    const calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    const currentOperand = document.getElementById('currentOperand');
    const previousOperand = document.getElementById('previousOperand');
    const buttons = document.querySelectorAll('.calc-btn');

    function updateDisplay() {
        currentOperand.textContent = calculator.displayValue;
        
        if (calculator.firstOperand !== null) {
            previousOperand.textContent = 
                `${calculator.firstOperand} ${calculator.operator || ''}`;
        } else {
            previousOperand.textContent = '';
        }
    }

    function inputDigit(digit) {
        const { displayValue, waitingForSecondOperand } = calculator;
        
        if (waitingForSecondOperand === true) {
            calculator.displayValue = digit;
            calculator.waitingForSecondOperand = false;
        } else {
            calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }

    function inputDecimal(dot) {
        if (calculator.waitingForSecondOperand) {
            calculator.displayValue = '0.';
            calculator.waitingForSecondOperand = false;
            return;
        }
        
        if (!calculator.displayValue.includes(dot)) {
            calculator.displayValue += dot;
        }
    }

    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculator;
        const inputValue = parseFloat(displayValue);
        
        if (operator && calculator.waitingForSecondOperand) {
            calculator.operator = nextOperator;
            return;
        }
        
        if (firstOperand === null) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            
            calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
            calculator.firstOperand = result;
        }
        
        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
    }

    function calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '×':
                return firstOperand * secondOperand;
            case '÷':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }

    function resetCalculator() {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }

    function deleteLastDigit() {
        if (calculator.displayValue.length === 1) {
            calculator.displayValue = '0';
        } else {
            calculator.displayValue = calculator.displayValue.slice(0, -1);
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const { action } = button.dataset;
            
            if (!action) return;
            
            switch (action) {
                case '+':
                case '-':
                case '×':
                case '÷':
                    handleOperator(action);
                    break;
                case '=':
                    if (calculator.firstOperand === null) return;
                    handleOperator(action);
                    calculator.operator = null;
                    break;
                case '.':
                    inputDecimal(action);
                    break;
                case 'clear':
                    resetCalculator();
                    break;
                case 'delete':
                    deleteLastDigit();
                    break;
                default:
                    if (Number.isInteger(parseFloat(action))) {
                        inputDigit(action);
                    }
            }
            
            updateDisplay();
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        
        if (key >= '0' && key <= '9') {
            inputDigit(key);
        } else if (key === '.') {
            inputDecimal(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            const operator = key === '*' ? '×' : key === '/' ? '÷' : key;
            handleOperator(operator);
        } else if (key === 'Enter' || key === '=') {
            if (calculator.firstOperand === null) return;
            handleOperator('=');
            calculator.operator = null;
        } else if (key === 'Escape') {
            resetCalculator();
        } else if (key === 'Backspace') {
            deleteLastDigit();
        }
        
        updateDisplay();
    });

    updateDisplay();
});