const operandButtons = document.querySelectorAll("[operands]");
const currentTextField = document.querySelector(".big-text");
let firstNumber;
let secondNumber;
let operator;
let answer;

function operate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case "+":
            add(firstNumber, secondNumber);
            break;
        case "-":
            subtract(firstNumber, secondNumber);
            break;
        case "*":
            multiply(firstNumber, secondNumber);
            break;
        case "/":
            divide(firstNumber, secondNumber);
            break;
        default:
            console.log("Invalid");
    }
}

operate(firstNumber, secondNumber, operator);

function add(x, y) {
    return answer = x + y;
}
function subtract(x, y) {
    return answer = x - y;
}
function multiply(x, y) {
    return answer = x * y;
}
function divide(x, y) {
    return answer = x / y;
}

function displayOutput(){
    operandButtons.forEach((button)=>{
        button.addEventListener("click", ()=>{
            currentTextField.textContent += button.textContent;
        })
    })
}
displayOutput();