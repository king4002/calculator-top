// Basic Math Functions
function add(a, b) {
    return a + b;
  }
  
  function subtract(a, b) {
    return a - b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  function divide(a, b) {
    if (b === 0) {
      return "Error: Division by zero";
    }
    return a / b;
  }
  
  // Operate Function with Rounding
  function operate(operator, a, b) {
    let result;
    switch (operator) {
      case '+':
        result = add(a, b);
        break;
      case '-':
        result = subtract(a, b);
        break;
      case '×':
        result = multiply(a, b);
        break;
      case '÷':
        if (b === 0) return "Error: Division by zero";
        result = divide(a, b);
        break;
      default:
        return "Invalid operator";
    }
    // Round to 10 decimal places
    return Math.round(result * 1e10) / 1e10;
  }
  
  // Calculator State Variables
  let firstNumber = null;
  let operator = null;
  let secondNumber = null;
  let displayValue = '0';
  let shouldResetDisplay = false;
  
  // Selecting Elements
  const display = document.getElementById('display');
  const numberButtons = document.querySelectorAll('.number');
  const operatorButtons = document.querySelectorAll('.operator');
  const equalsButton = document.getElementById('equals');
  const clearButton = document.getElementById('clear');
  const decimalButton = document.querySelector('.decimal');
  const backspaceButton = document.getElementById('backspace');
  
  // Update Display Function
  function updateDisplay() {
    display.textContent = displayValue;
  }
  
  // Number Button Event Listeners
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (shouldResetDisplay) {
        displayValue = button.dataset.number;
        shouldResetDisplay = false;
      } else {
        displayValue = displayValue === '0' ? button.dataset.number : displayValue + button.dataset.number;
      }
      updateDisplay();
    });
  });
  
  // Operator Button Event Listeners
  operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (operator && !shouldResetDisplay) {
        secondNumber = parseFloat(displayValue);
        const result = operate(operator, firstNumber, secondNumber);
        displayValue = String(result);
        updateDisplay();
        firstNumber = result;
      } else {
        firstNumber = parseFloat(displayValue);
      }
      operator = button.dataset.operator;
      shouldResetDisplay = true;
    });
  });
  
  // Equals Button Event Listener
  equalsButton.addEventListener('click', () => {
    if (operator && !shouldResetDisplay) {
      secondNumber = parseFloat(displayValue);
      const result = operate(operator, firstNumber, secondNumber);
      displayValue = String(result);
      updateDisplay();
      firstNumber = result;
      operator = null;
    }
  });
  
  // Clear Button Event Listener
  clearButton.addEventListener('click', () => {
    displayValue = '0';
    firstNumber = null;
    operator = null;
    secondNumber = null;
    updateDisplay();
  });
  
  // Decimal Button Event Listener
  decimalButton.addEventListener('click', () => {
    if (!displayValue.includes('.')) {
      displayValue += '.';
      updateDisplay();
    }
  });
  
  // Backspace Button Event Listener
  backspaceButton.addEventListener('click', () => {
    if (shouldResetDisplay) return;
    if (displayValue.length > 1) {
      displayValue = displayValue.slice(0, -1);
    } else {
      displayValue = '0';
    }
    updateDisplay();
  });
  
  // Keyboard Support
  document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key)) { // If it's a number
      const button = document.querySelector(`.number[data-number="${key}"]`);
      if (button) button.click();
    }
    if (['+', '-', '*', '/'].includes(key)) {
      let operatorKey = key;
      if (key === '*') operatorKey = '×';
      if (key === '/') operatorKey = '÷';
      const button = document.querySelector(`.operator[data-operator="${operatorKey}"]`);
      if (button) button.click();
    }
    if (key === 'Enter' || key === '=') {
      equalsButton.click();
    }
    if (key === 'Backspace') {
      backspaceButton.click();
    }
    if (key === 'Escape') {
      clearButton.click();
    }
    if (key === '.') {
      decimalButton.click();
    }
  });
  