// Select elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Variables
let currentInput = '0'; // Starts with '0'
let operator = '';     // Current operator
let firstOperand = ''; // First number before an operator

// Map for keyboard inputs
const keyMap = {
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide',
  '%': 'modulo',
  'Enter': 'equals',
  'Backspace': 'backspace',
  'Escape': 'ac',
  '.': 'dot',
  's': 'sin',
  'c': 'cos',
  't': 'tan',
  'l': 'log',
  'e': 'exp',
  'p': 'pi',
  '√': 'sqrt',
};

// Event listeners for button clicks
buttons.forEach((button) => {
  button.addEventListener('click', () => handleInput(button.id));
});

// Event listener for keyboard inputs
document.addEventListener('keydown', (e) => {
  const id = keyMap[e.key] || e.key; // Map the pressed key to button ID
  if (!isNaN(e.key) || id) handleInput(id);
});

// Function to handle all inputs
function handleInput(id) {
  if (!isNaN(id) || id === 'dot') {
    // Handle numbers and decimals
    if (currentInput === '0' && id !== 'dot') {
      currentInput = ''; // Clear initial '0' for new input
    }
    if (id === 'dot' && currentInput.includes('.')) return; // Prevent multiple dots
    currentInput += id === 'dot' ? '.' : id; // Append number or dot
    updateDisplay(currentInput);
  } else if (id === 'ac') {
    // Clear all inputs
    resetCalculator();
  } else if (id === 'backspace') {
    // Remove last character
    currentInput = currentInput.slice(0, -1) || '0'; // Fallback to '0' if empty
    updateDisplay(currentInput);
  } else if (['add', 'subtract', 'multiply', 'divide', 'modulo'].includes(id)) {
    // Handle operator input
    if (currentInput === '') return;
    firstOperand = currentInput;
    operator = id;
    currentInput = '';
  } else if (id === 'equals') {
    // Perform calculation
    calculateResult();
  } else {
    // Handle scientific functions
    handleScientificOperation(id);
  }
}

// Function to handle scientific operations
function handleScientificOperation(id) {
  if (currentInput === '') return;
  const num = parseFloat(currentInput);
  switch (id) {
    case 'sin':
      currentInput = Math.sin((num * Math.PI) / 180).toString();
      break;
    case 'cos':
      currentInput = Math.cos((num * Math.PI) / 180).toString();
      break;
    case 'tan':
      currentInput = Math.tan((num * Math.PI) / 180).toString();
      break;
    case 'sqrt':
      currentInput = Math.sqrt(num).toString();
      break;
    case 'log':
      currentInput = Math.log10(num).toString();
      break;
    case 'ln':
      currentInput = Math.log(num).toString();
      break;
    case 'exp':
      currentInput = Math.exp(num).toString();
      break;
    case 'pi':
      currentInput = Math.PI.toString();
      break;
    default:
      return;
  }
  updateDisplay(currentInput);
}

// Function to calculate result
function calculateResult() {
  if (firstOperand === '' || currentInput === '' || operator === '') return;
  const num1 = parseFloat(firstOperand);
  const num2 = parseFloat(currentInput);
  let result;
  switch (operator) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      result = num2 !== 0 ? num1 / num2 : 'Error';
      break;
    case 'modulo':
      result = num1 % num2;
      break;
    default:
      result = 'Error';
  }
  updateDisplay(result);
  currentInput = result.toString();
  operator = '';
  firstOperand = '';
}

// Function to update display
function updateDisplay(value) {
  display.innerText = value.length > 10 ? value.slice(0, 10) : value; // Limit length
}

// Function to reset calculator
function resetCalculator() {
  currentInput = '0';
  firstOperand = '';
  operator = '';
  updateDisplay(currentInput);
}
