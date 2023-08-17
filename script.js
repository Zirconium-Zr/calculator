const operandButtons = document.querySelectorAll("[operands]");
const operatorButtons = document.querySelectorAll("[operators]");
const specialButtons = document.querySelectorAll("[special-key]");
const currentTextField = document.querySelector(".big-text");
const previousTextField = document.querySelector(".small-text");
const equalsButton = document.querySelector("[equals]");
const deleteButton = document.querySelector(".delete");
const clearAllButton = document.querySelector(".clearAll");
const clearEntryButton = document.querySelector(".clearEntry");
const allButtons = document.querySelectorAll("button");
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

operate(firstNumber, secondNumber, operator);

function compute() {
    switch (operator) {
        case "+":
            answer = add(parseFloat(firstNumber), parseFloat(secondNumber));
            currentTextField.textContent = answer;
            break;
        case "−":
            answer = subtract(parseFloat(firstNumber), parseFloat(secondNumber));
            currentTextField.textContent = answer;
            break;
        case "×":
            answer = multiply(parseFloat(firstNumber), parseFloat(secondNumber));
            currentTextField.textContent = answer;
            break;
        case "÷":
            answer = divide(parseFloat(firstNumber), parseFloat(secondNumber));
            if (secondNumber == 0 && firstNumber != 0) {
                currentTextField.textContent = "Cannot divide by zero";
                resetCalculator();
            } else if (secondNumber == 0 && firstNumber == 0) {
                currentTextField.textContent = "Result is undefined";
                resetCalculator();
            } else {
                currentTextField.textContent = answer;
            }
        default:
            previousTextField.textContent = `${parseFloat(currentTextField.textContent)} =`;
    }
    if (operator != undefined) {
        previousTextField.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
    }
}

// When answer is infinity
function resetCalculator() {
    allButtons.forEach((button) => {
        if (!button.classList.contains("number") && !button.classList.contains("clearButton") && !button.classList.contains("equals")) {
            button.setAttribute("disabled", "");
        } else {
            button.addEventListener("click", () => location.reload());
        }
    })
}

function displayOutput() {
    let newNumber = false;
    let toggleCompute = false;
    let toggleEquals = false;
    currentTextField.textContent = "0";
    operandButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if(newNumber){
                currentTextField.textContent = "";
            }
            if(button.textContent == "." && currentTextField.textContent.includes(".")) return;
            if (newNumber) {
                if (toggleEquals) {
                    operator = null;
                    toggleEquals = false;
                }
                toggleCompute = true;
                if(button.textContent == "."){
                    currentTextField.textContent = "0" + button.textContent;
                }else{
                    currentTextField.textContent = button.textContent;
                }
                newNumber = false;
            } else {
                if(currentTextField.textContent == "0"){
                    if(button.textContent == "."){
                        currentTextField.textContent += button.textContent;
                    }else{
                        currentTextField.textContent = button.textContent;
                    }
                }else{
                    currentTextField.textContent += button.textContent;
                }
            }
            secondNumber = parseFloat(currentTextField.textContent);
            firstNumber = parseFloat(previousTextField.textContent);
        })
    })

    operatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            newNumber = true;
            toggleEquals = false;
            if (isNaN(firstNumber)) {
                firstNumber = "";
            }
            if (toggleCompute) {
                compute();
                toggleCompute = false;
            }
            previousTextField.textContent = `${currentTextField.textContent} ${button.textContent}`;
            operator = button.textContent;
        })
    })

    equalsButton.addEventListener("click", () => {
        if (toggleEquals) {
            firstNumber = parseFloat(currentTextField.textContent);
        } else {
            firstNumber = parseFloat(previousTextField.textContent);
            secondNumber = parseFloat(currentTextField.textContent);
        }
        compute();
        newNumber = true;
        toggleEquals = true;
    })
}

function deleteNumber() {
    currentTextField.textContent = currentTextField.textContent.slice(0, -1);
    if (currentTextField.textContent == "") {
        currentTextField.textContent = 0;
    }
}

function clearAll() {
    currentTextField.textContent = "0";
    previousTextField.textContent = "";
    operator = null;
}

function clearEntry() {
    currentTextField.textContent = "0";
}

function displayZero() {
    if (currentTextField.textContent == "") {
        currentTextField.textContent = "0";
    }
}

deleteButton.addEventListener("click", deleteNumber);
clearAllButton.addEventListener("click", clearAll);
clearEntryButton.addEventListener("click", clearEntry);
displayOutput();
