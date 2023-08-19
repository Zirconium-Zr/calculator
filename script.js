const allButtons = document.querySelectorAll("button");
const operandButtons = document.querySelectorAll("[operands]");
const operatorButtons = document.querySelectorAll("[operators]");
const specialButtons = document.querySelectorAll("[special-key]");
const currentTextField = document.querySelector(".big-text");
const previousTextField = document.querySelector(".small-text");
const equalsButton = document.querySelector("[equals]");
const deleteButton = document.querySelector(".delete");
const clearAllButton = document.querySelector(".clearAll");
const clearEntryButton = document.querySelector(".clearEntry");
const plusMinusButton = document.querySelector(".plusMinus");
const percentageButton = document.querySelector(".percentage");
const reciprocalButton = document.querySelector(".reciprocal");
const squareButton = document.querySelector(".square");
const squareRootButton = document.querySelector(".squareRoot");
let firstNumber;
let secondNumber;
let operator;
let answer;
let newNumber = false;
let toggleCompute = false;
let toggleEquals = false;
let flag = false;
let isOn = false;

function operate(firstNumber, secondNumber, operator) {
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
            // When user divides by zero
            if (secondNumber == 0 && firstNumber != 0) {
                currentTextField.textContent = "Cannot divide by zero";
                resetCalculator();
            } else if (secondNumber == 0 && firstNumber == 0) {
                currentTextField.textContent = "Result is undefined";
                resetCalculator();
            } else {
                currentTextField.textContent = answer;
            }
            break;
        default:
            if (!flag) {
                previousTextField.textContent = `${parseFloat(currentTextField.textContent)} =`;
                currentTextField.textContent = parseFloat(currentTextField.textContent);
            } else {
                previousTextField.textContent = `${previousTextField.textContent} =`;
                flag = false;
            }
    }
    if (operator != undefined) {
        previousTextField.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
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
    currentTextField.textContent = "0";
    // Display numbers
    operandButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (newNumber) {
                // To remove current text field values when dot (".") is pressed
                currentTextField.textContent = "";
            }

            if (button.textContent == "." && currentTextField.textContent.includes(".")) return;

            if (newNumber) {
                if (toggleEquals) {
                    operator = null;
                    toggleEquals = false;
                }
                toggleCompute = true;
                if (button.textContent == ".") {
                    currentTextField.textContent = "0" + button.textContent;
                } else {
                    currentTextField.textContent = button.textContent;
                }
                newNumber = false;
            } else {
                if (currentTextField.textContent == "0") {
                    if (button.textContent == ".") {
                        currentTextField.textContent += button.textContent;
                    } else {
                        currentTextField.textContent = button.textContent;
                    }
                } else {
                    currentTextField.textContent += button.textContent;
                }
            }
            secondNumber = parseFloat(currentTextField.textContent);
            firstNumber = parseFloat(previousTextField.textContent);
        })
    })

    //Display operator
    operatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            isOn = true;
            newNumber = true;
            toggleEquals = false;
            if (isNaN(firstNumber)) {
                firstNumber = "";
            }
            if (toggleCompute) {
                operate(firstNumber, secondNumber, operator);
                toggleCompute = false;
            }
            previousTextField.textContent = `${currentTextField.textContent} ${button.textContent}`;
            operator = button.textContent;
        })
    })

    // Display answer when '=' is pressed
    equalsButton.addEventListener("click", () => {
        if (toggleEquals) {
            firstNumber = parseFloat(currentTextField.textContent);
        } else {
            firstNumber = parseFloat(previousTextField.textContent);
            secondNumber = parseFloat(currentTextField.textContent);
        }
        operate(firstNumber, secondNumber, operator);
        newNumber = true;
        toggleEquals = true;
    })
}

// Backspace
function deleteNumber() {
    currentTextField.textContent = currentTextField.textContent.slice(0, -1);
    if (currentTextField.textContent == "") {
        currentTextField.textContent = 0;
    }
}

// AC - clear everything on screen
function clearAll() {
    currentTextField.textContent = "0";
    previousTextField.textContent = "";
    operator = null;
}

// Clear just the entry field/ current text field
function clearEntry() {
    currentTextField.textContent = "0";
}

// Don't let current text field be empty
function displayZero() {
    if (currentTextField.textContent == "") {
        currentTextField.textContent = "0";
    }
}

// Positive to negative and vice-versa
function changeSign() {
    currentTextField.textContent *= -1;
    if (toggleEquals) {
        previousTextField.textContent = `negate(${previousTextField.textContent})`;

        previousTextField.textContent = previousTextField.textContent.replace(`${firstNumber} ${operator} ${secondNumber}`, answer);

        previousTextField.textContent = previousTextField.textContent.replace("=", "");
        previousTextField.textContent = previousTextField.textContent.replace(/\s/g, "");
    }
}

function calculatePercent() {
    // Perform calculation
    if (toggleEquals) {
        answer = (answer * answer) / 100;
        previousTextField.textContent = answer;
    } else {
        answer = (firstNumber * secondNumber) / 100;
        previousTextField.textContent = `${firstNumber} ${operator} ${answer}`;
    }

    // Set values and check conditions
    if (isNaN(firstNumber) || operator == undefined) {
        previousTextField.textContent = 0;
        currentTextField.textContent = 0;
    } else {
        // Store new answer to secondNumber variable so that computation does not happen with old answer
        secondNumber = answer;
        currentTextField.textContent = answer;
    }
    newNumber = true;
}

function getReciprocal() {
    flag = true;
    let number = currentTextField.textContent;
    answer = (1 / number);
    if (answer == Infinity) {
        previousTextField.textContent = `1/(${number})`;
        currentTextField.textContent = "Cannot divide by zero";
        resetCalculator();
        return;
    }
    currentTextField.textContent = answer;
    previousTextField.textContent = `1/(${previousTextField.textContent})`;

    if (toggleEquals) {
        previousTextField.textContent = previousTextField.textContent.replace(`1/(${firstNumber} ${operator} ${secondNumber} =)`, `1/(${parseFloat(number)})`);
    } else {
        previousTextField.textContent = previousTextField.textContent.replace("1/()", `1/(${parseFloat(number)})`);
    }
}

function getSquareNumber() {
    flag = true;
    let number = currentTextField.textContent;
    answer = Math.pow(number, 2);
    currentTextField.textContent = answer;

    if (isOn) {
        previousTextField.textContent += ` sqr(${previousTextField.textContent.slice(0, -1).trim()})`;
        isOn = false;
    } else {
        previousTextField.textContent = `sqr(${previousTextField.textContent})`;
    }

    if (toggleEquals) {
        previousTextField.textContent = previousTextField.textContent.replace(`sqr(${firstNumber} ${operator} ${secondNumber} =)`, `sqr(${parseFloat(number)})`);
    } else {
        previousTextField.textContent = previousTextField.textContent.replace(`sqr()`, `sqr(${parseFloat(number)})`);
    }
}

function getSquareRoot() {
    flag = true;
    let number = currentTextField.textContent;
    if(isOn){
        previousTextField.textContent = currentTextField.textContent;
    }
    answer = Math.sqrt(number);
    currentTextField.textContent = answer;
    previousTextField.textContent = `√(${previousTextField.textContent})`;

    if (toggleEquals) {
        previousTextField.textContent = previousTextField.textContent.replace("=", "");
        previousTextField.textContent = previousTextField.textContent.replace(/\s/g, "");

        previousTextField.textContent = previousTextField.textContent.replace(`√(${firstNumber}${operator}${secondNumber})`, `√(${number})`);

    } else {
        previousTextField.textContent = previousTextField.textContent.replace("√()", `√(${parseFloat(number)})`);
    }
}

deleteButton.addEventListener("click", deleteNumber);
clearAllButton.addEventListener("click", clearAll);
clearEntryButton.addEventListener("click", clearEntry);
plusMinusButton.addEventListener("click", changeSign);
percentageButton.addEventListener("click", calculatePercent);
reciprocalButton.addEventListener("click", getReciprocal);
squareButton.addEventListener("click", getSquareNumber);
squareRootButton.addEventListener("click", getSquareRoot);

displayOutput();