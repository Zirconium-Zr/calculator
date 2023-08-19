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
let operator;
let answer;
let newNumber = false;
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

operandButtons.forEach((button)=>{
    button.addEventListener("click", ()=> displayNumber(button.textContent));
})

function displayNumber(number){
    if(currentTextField.textContent == "0"){
        currentTextField.textContent = number;
    }else{
        currentTextField.textContent += number;
    }
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
                    if(currentTextField.textContent.length >= 16){
                        return;
                    }
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
            if (isOn) {
                firstNumber = currentTextField.textContent;
            }
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

        createHistoryDiv();
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
    selectSpecialKey = true;
    let number = currentTextField.textContent;
    // Remove trailing operator sign
    if (isOn) {
        previousTextField.textContent = currentTextField.textContent;
        console.log(firstNumber);
        isOn = false;
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

        previousTextField.textContent = previousTextField.textContent.replace(`1/(${firstNumber} ${operator} ${secondNumber} =)`, `1/(${parseFloat(number)})`);
    } else {
        previousTextField.textContent = previousTextField.textContent.replace("1/()", `1/(${parseFloat(number)})`);
    }
}

function getSquareNumber() {
    selectSpecialKey = true;
    let number = currentTextField.textContent;
    // Remove trailing operator sign
    if (isOn) {
        previousTextField.textContent = currentTextField.textContent;
        isOn = false;
    }
    answer = Math.pow(number, 2);
    currentTextField.textContent = answer;
    previousTextField.textContent = `sqr(${previousTextField.textContent})`;

    if (toggleEquals) {
        previousTextField.textContent = previousTextField.textContent.replace("=", "");
        previousTextField.textContent = previousTextField.textContent.replace(/\s/g, "");

        previousTextField.textContent = previousTextField.textContent.replace(`sqr(${firstNumber} ${operator} ${secondNumber} =)`, `sqr(${parseFloat(number)})`);
    } else {
        previousTextField.textContent = previousTextField.textContent.replace(`sqr()`, `sqr(${parseFloat(number)})`);
    }
}

function getSquareRoot() {
    selectSpecialKey = true;
    let number = currentTextField.textContent;
    // Remove trailing operator sign
    if (isOn) {
        previousTextField.textContent = currentTextField.textContent;
        isOn = false;
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

// document.addEventListener("keypress", ()=>{

// })

displayMemory();
// displayOutput();