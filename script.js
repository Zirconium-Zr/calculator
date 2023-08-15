const operandButtons = document.querySelectorAll("[operands]");
const operatorButtons = document.querySelectorAll("[operators]");
const currentTextField = document.querySelector(".big-text");
const previousTextField = document.querySelector(".small-text");
const equalsButton = document.querySelector("[equals]");
let firstNumber;
let secondNumber;
let operator;
let answer;

function operate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case "+":
            add(firstNumber, secondNumber);
            break;
        case "−":
            subtract(firstNumber, secondNumber);
            break;
        case "×":
            multiply(firstNumber, secondNumber);
            break;
        case "÷":
            divide(firstNumber, secondNumber);
            break;
    }
}

operate(firstNumber, secondNumber, operator);

function add(x, y) {
    return (x + y);
}
function subtract(x, y) {
    return (x - y);
}
function multiply(x, y) {
    return (x * y);
}
function divide(x, y) {
    return (x / y);
}

function displayOutput() {
    let newNumber = false;
    operandButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (newNumber) {
                currentTextField.textContent = button.textContent;
                newNumber = false;
            } else {
                currentTextField.textContent = currentTextField.textContent == "0" ? button.textContent : currentTextField.textContent += button.textContent;
            }
        })
    })

    operatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            newNumber = true;
            previousTextField.textContent = currentTextField.textContent + button.textContent;
            operator = button.textContent;
        })
    })

    equalsButton.addEventListener("click", () => {
        firstNumber = parseInt(previousTextField.textContent);
        secondNumber = parseInt(currentTextField.textContent);

        if(operator == "+"){
            currentTextField.textContent = add(firstNumber, secondNumber);
            previousTextField.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
        }else if(operator == "-"){
            currentTextField.textContent = subtract(firstNumber, secondNumber);
            previousTextField.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
        }else if(operator == "×"){
            currentTextField.textContent = multiply(firstNumber, secondNumber);
            previousTextField.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
        }else if(operator == "÷"){
            currentTextField.textContent = divide(firstNumber, secondNumber);
            previousTextField.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
        }
    })
}
displayOutput();