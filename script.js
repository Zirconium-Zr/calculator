const operandButtons = document.querySelectorAll("[operands]");
const operatorButtons = document.querySelectorAll("[operators]");
const currentTextField = document.querySelector(".big-text");
const previousTextField = document.querySelector(".small-text");
const equalsButton = document.querySelector("[equals]");
let previousNumber;
let currentNumber;
let operator;
let answer;

function operate(previousNumber, currentNumber, operator) {
    switch (operator) {
        case "+":
            add(previousNumber, currentNumber);
            break;
        case "−":
            subtract(previousNumber, currentNumber);
            break;
        case "×":
            multiply(previousNumber, currentNumber);
            break;
        case "÷":
            divide(previousNumber, currentNumber);
            break;
    }
}

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

operate(previousNumber, currentNumber, operator);

function compute() {
    if (operator == "+") {
        currentTextField.textContent = add(previousNumber, currentNumber);
    } else if (operator == "−") {
        currentTextField.textContent = subtract(previousNumber, currentNumber);
    } else if (operator == "×") {
        currentTextField.textContent = multiply(previousNumber, currentNumber);
    } else if (operator == "÷") {
        currentTextField.textContent = divide(previousNumber, currentNumber);
    }
    previousTextField.textContent = `${previousNumber} ${operator} ${currentNumber} =`;
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
            currentNumber = parseInt(currentTextField.textContent);
            previousNumber = parseInt(previousTextField.textContent);

        })
    })

    operatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (isNaN(previousNumber)) {
                previousNumber = "";
            }
            compute();
            newNumber = true;
            previousTextField.textContent = currentTextField.textContent + button.textContent;
            operator = button.textContent;
            currentNumber = parseInt(currentTextField.textContent);
            previousNumber = parseInt(previousTextField.textContent);
            console.log("Current num", currentNumber);
            console.log("Previous num", previousNumber);
        })
    })

    equalsButton.addEventListener("click", () => {
        previousNumber = parseInt(previousTextField.textContent);
        currentNumber = parseInt(currentTextField.textContent);
        compute();
    })
}
displayOutput();
