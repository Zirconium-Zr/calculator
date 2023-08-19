const allButtons = document.querySelectorAll("button");
const operandButtons = document.querySelectorAll("[operands]");
const operatorButtons = document.querySelectorAll("[operators]");
const specialButtons = document.querySelectorAll("[special-key]");
const currentTextField = document.querySelector(".big-text");
const previousTextField = document.querySelector(".small-text");
const equalsButton = document.querySelector("[equals]");
const storedContent = document.querySelector(".stored-content");
const calculatorScreen = document.querySelector(".screen");
const dummyText = document.createElement("p");
const historyButton = document.querySelector(".history");
const memoryButton = document.querySelector(".memory");
const clearMemoryButton = document.createElement("button");

window.onload = () => {
    historyButton.click();
    dummyText.style.textAlign = "start";
    clearMemoryButton.classList.add("clearMemoButton");
    clearMemoryButton.textContent = `Clear`;
}

let firstNumber;
let secondNumber;
let operatorSign;
let answer;
let inputNewNumber = false;
let toggleCompute = false;
let toggleEquals = false;
let selectSpecialKey = false;
let selectOperatorKey = false;

function createHistoryDiv() {
    const historyContent = document.createElement("div");
    historyContent.classList.add("historyContent");
    historyContent.innerHTML = `<span style="color:rgb(171, 171, 171);background-color:transparent">${previousTextField.textContent}</span> <br> <p style="font-size:21px; font-weight:600;background-color:transparent">${currentTextField.textContent}</p`;
    dummyText.remove();
    storedContent.appendChild(historyContent);
    storedContent.appendChild(clearMemoryButton);
    memoryButton.setAttribute("disabled", "");
}

function displayMemory() {
    function setHistorySection() {
        historyButton.style.textDecoration = "underline";
        memoryButton.style.textDecoration = "none";
        historyButton.style.textDecorationColor = "gray";
        historyButton.style.textUnderlineOffset = "0.5rem";
        historyButton.style.textDecorationThickness = "0.2rem";
        if (!toggleEquals || storedContent.textContent == "") {
            dummyText.textContent = "There's no history yet";
        }
    }
    function setMemorySection() {
        memoryButton.style.textDecoration = "underline";
        historyButton.style.textDecoration = "none";
        memoryButton.style.textDecorationColor = "gray";
        memoryButton.style.textUnderlineOffset = "0.5rem";
        memoryButton.style.textDecorationThickness = "0.2rem";
        if (!toggleEquals) {
            dummyText.textContent = "Under maintainence";
        }
    }

    clearMemoryButton.addEventListener("click", () => {
        let historyContent = document.querySelectorAll(".historyContent");
        historyContent.forEach((element) => {
            element.remove();
        })
        clearMemoryButton.remove();

        // dummyText.textContent = "There's no history yet";
        // memoryButton.removeAttribute("disabled");
        storedContent.appendChild(dummyText);

    })
    storedContent.appendChild(dummyText);
    historyButton.addEventListener("click", setHistorySection);
    memoryButton.addEventListener("click", setMemorySection);
}

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
            if (!selectSpecialKey) {
                previousTextField.textContent = `${parseFloat(currentTextField.textContent)} =`;
                currentTextField.textContent = parseFloat(currentTextField.textContent);
            } else {
                previousTextField.textContent = `${previousTextField.textContent} =`;
                selectSpecialKey = false;
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

currentTextField.textContent = "0";

operandButtons.forEach((button) => {
    button.addEventListener("click", () => displayNumber(button.textContent));
})

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => displayOperator(button.textContent));
})

equalsButton.addEventListener("click", displayAnswer);

document.addEventListener("keydown", (event) => {
    if (event.key >= 0 && event.key <= 9 || event.key == ".") {
        displayNumber(event.key);
    }

    if(event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/"){
        displayOperator(convertOperator(event.key));
    }
})

function convertOperator(keyboardInput){
    if(keyboardInput === "+") return "+";
    if(keyboardInput === "-") return "−";
    if(keyboardInput === "*") return "×";
    if(keyboardInput === "/") return "÷";
}

function displayNumber(number) {
    if (inputNewNumber) {
        // To remove current text field values when dot (".") is pressed
        currentTextField.textContent = "";
    }
    if (currentTextField.textContent.includes(".") && number == ".") return;

    if (inputNewNumber) {
        if (toggleEquals) {
            operatorSign = null;
            if(number == "."){
                previousTextField.textContent = "";
            }
            toggleEquals = false;
        }
        toggleCompute = true;
        inputNewNumber = false;
        if (number == ".") {
            currentTextField.textContent = "0" + number;
        } else {
            currentTextField.textContent = number;
        }
    } else {
        if (currentTextField.textContent == "0") {
            if (number == ".") {
                currentTextField.textContent += number;
            } else {
                currentTextField.textContent = number;
            }
        } else {
            if (currentTextField.textContent.length >= 16) {
                return;
            }
            currentTextField.textContent += number;
        }
    }

    firstNumber = parseFloat(previousTextField.textContent);
    secondNumber = parseFloat(currentTextField.textContent);
}

function displayOperator(operator) {
    selectOperatorKey = true;
    inputNewNumber = true;
    toggleEquals = false;
    if (isNaN(firstNumber)) {
        firstNumber = "";
    }
    if(toggleCompute){
        operate(firstNumber, secondNumber, operatorSign);
        toggleCompute = false;
    }
    operatorSign = operator;
    previousTextField.textContent = `${currentTextField.textContent} ${operatorSign}`;
    if (selectOperatorKey) {
        firstNumber = currentTextField.textContent;
    }
}

function displayAnswer(){
    if (toggleEquals) {
        firstNumber = parseFloat(currentTextField.textContent);
    } else {
        firstNumber = parseFloat(previousTextField.textContent);
        secondNumber = parseFloat(currentTextField.textContent);
    }
    operate(firstNumber, secondNumber, operatorSign);
    inputNewNumber = true;
    toggleEquals = true;

    createHistoryDiv();
}

// Backspace
function deleteNumber() {
    currentTextField.textContent = currentTextField.textContent.slice(0, -1);
    if (currentTextField.textContent == "") {
        displayZero();
    }
}

// AC - clear everything on screen
function clearAll() {
    currentTextField.textContent = "0";
    previousTextField.textContent = "";
    operatorSign = null;
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
    inputNewNumber = true;
}

function getReciprocal() {
    selectSpecialKey = true;
    let number = currentTextField.textContent;
    // Remove trailing operator sign
    if (selectOperatorKey) {
        previousTextField.textContent = currentTextField.textContent;
        selectOperatorKey = false;
    }
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
        previousTextField.textContent = previousTextField.textContent.replace("=", "");
        previousTextField.textContent = previousTextField.textContent.replace(/\s/g, "");

        previousTextField.textContent = previousTextField.textContent.replace(`1/(${firstNumber} ${operatorSign} ${secondNumber} =)`, `1/(${parseFloat(number)})`);
    } else {
        previousTextField.textContent = previousTextField.textContent.replace("1/()", `1/(${parseFloat(number)})`);
    }
}

function getSquareNumber() {
    selectSpecialKey = true;
    let number = currentTextField.textContent;
    // Remove trailing operator sign
    if (selectOperatorKey) {
        previousTextField.textContent = currentTextField.textContent;
        selectOperatorKey = false;
    }
    answer = Math.pow(number, 2);
    currentTextField.textContent = answer;
    previousTextField.textContent = `sqr(${previousTextField.textContent})`;

    if (toggleEquals) {
        previousTextField.textContent = previousTextField.textContent.replace("=", "");
        previousTextField.textContent = previousTextField.textContent.replace(/\s/g, "");

        previousTextField.textContent = previousTextField.textContent.replace(`sqr(${firstNumber} ${operatorSign} ${secondNumber} =)`, `sqr(${parseFloat(number)})`);
    } else {
        previousTextField.textContent = previousTextField.textContent.replace(`sqr()`, `sqr(${parseFloat(number)})`);
    }
}

function getSquareRoot() {
    selectSpecialKey = true;
    let number = currentTextField.textContent;
    // Remove trailing operator sign
    if (selectOperatorKey) {
        previousTextField.textContent = currentTextField.textContent;
        selectOperatorKey = false;
    }
    answer = Math.sqrt(number);
    currentTextField.textContent = answer;
    previousTextField.textContent = `√(${previousTextField.textContent})`;

    if (toggleEquals) {
        previousTextField.textContent = previousTextField.textContent.replace("=", "");
        previousTextField.textContent = previousTextField.textContent.replace(/\s/g, "");

        previousTextField.textContent = previousTextField.textContent.replace(`√(${firstNumber}${operatorSign}${secondNumber})`, `√(${number})`);

    } else {
        previousTextField.textContent = previousTextField.textContent.replace("√()", `√(${parseFloat(number)})`);
    }
}

allButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("delete")) deleteNumber();
        if (button.classList.contains("clearAll")) clearAll();
        if (button.classList.contains("clearEntry")) clearEntry();
        if (button.classList.contains("percentage")) calculatePercent();
        if (button.classList.contains("plusMinus")) changeSign();
        if (button.classList.contains("reciprocal")) getReciprocal();
        if (button.classList.contains("square")) getSquareNumber();
        if (button.classList.contains("squareRoot")) getSquareRoot();
    })
})

displayMemory();