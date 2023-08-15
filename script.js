const operandButtons = document.querySelectorAll("[operands]");
const operatorButtons = document.querySelectorAll("[operators]");
const currentTextField = document.querySelector(".big-text");
const previousTextField = document.querySelector(".small-text");
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
            currentTextField.textContent = currentTextField.textContent == "0" ? button.textContent : currentTextField.textContent += button.textContent;
        })
    })

    operatorButtons.forEach((button)=>{
        button.addEventListener("click", ()=>{
            previousTextField.textContent = currentTextField.textContent + button.textContent;
        })
    })
}
displayOutput();