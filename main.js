const currentOperation = document.querySelector('.currentOperation');
const previousOperation = document.querySelector('.previousOperation');
const buttons = document.querySelectorAll('.btn');
const numberKeys = document.querySelectorAll('button[data-number]');
const operatorKeys = document.querySelectorAll('button[data-operator]');

let currentNumber = '';
let previousNumber = '';
let selectedOperator = undefined; 

function setCurrentDisplay(value) {
    currentOperation.textContent = value;
}

function setPreviousDisplay(value) {
    if( selectedOperator != null){
        console.log(selectedOperator);
        previousOperation.textContent = `${value} ${selectedOperator}`;
    }else{
        previousOperation.textContent = value;
    }
}

function updateDisplay(current, previous) {
    setCurrentDisplay(current);
    setPreviousDisplay(previous);
}

function getCurrentDisplay() {
    return currentOperation.textContent;
}

function appendNumber(value) {
    if (getCurrentDisplay() === '0') {
        setCurrentDisplay(value);
    } else {
        setCurrentDisplay(getCurrentDisplay().concat(value));
    }
}

function appendDot() {
    if(!getCurrentDisplay().includes('.')){
        setCurrentDisplay(getCurrentDisplay().concat('.'));
    }
}

function clear() {
    currentNumber = '';
    previousNumber = '';
    selectedOperator = undefined;
    updateDisplay('0','');
}

function deleteValue() {
    if(getCurrentDisplay().length !== 1) {
        setCurrentDisplay(getCurrentDisplay().slice(0,-1));
    }else{
        setCurrentDisplay('0');
    }
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b === 0 ? 'Error' : a/b;
}

function compute(){
    let result;
    let current = Number(currentNumber);
    console.log(`Current Value: ${current}`);
    let prev = Number(previousNumber);
    console.log(`Previous Value: ${prev}`);
    if( Number.isNaN(currentNumber) || Number.isNaN(previousNumber) ){
        return;
    }
    switch(selectedOperator) {
        case '+':
            result = add(prev, current);
            break;
        case '−':
            result = substract(prev, current);
            break;
        case '×':
        case '*':
            result = multiply(prev, current);
            break;
        case '÷':
        case '/':
            result = divide(prev, current);
            break;
        default:
            return;
    }
    currentNumber = result;
    console.log(`Result: ${result}`);
    previousNumber = '';
    selectedOperator = undefined;
    updateDisplay(currentNumber, previousNumber);
}

function setOperator(operator) {
    currentNumber = getCurrentDisplay();
    if(currentNumber === '') {
        selectedOperator = operator;
        return;
    }
    if(previousNumber !== ''){
        compute();
    }
    selectedOperator = operator;
    previousNumber = currentNumber;
    currentNumber = '';
}

setCurrentDisplay('0');

buttons.forEach(button => button.addEventListener('click', () => {
    if(!Number.isNaN(Number(button.textContent))){
        appendNumber(button.textContent);
    }else {
        switch(button.textContent){
            case 'Clear':
                clear();
                break;
            case 'Del':
                deleteValue();
                break;
            case '.':
                appendDot();
                break;
            case '=':
                setOperator(undefined);
                updateDisplay(currentNumber, previousNumber);
                break;
            default:
                setOperator(button.textContent);
                updateDisplay(currentNumber, previousNumber);
        }
    }
}));

window.addEventListener('keydown', button => {
    if(0 <= button.key && 9 >= button.key ){
        appendNumber(button.key);
    }else if(button.key === "."){
        appendDot();
    }else if(button.key === "="){
        setOperator(undefined);
        updateDisplay(currentNumber, previousNumber);
    }else if(button.key === "Backspace"){
        deleteValue();
    }else if(button.key === "+" || button.key === "-" || button.key === "*" || button.key === "/"){
        setOperator(button.key);
        updateDisplay(currentNumber, previousNumber);
    }
});