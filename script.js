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
        answer = add(previousNumber, currentNumber);
        currentTextField.textContent = answer;
    } else if (operator == "−") {
        answer = subtract(previousNumber, currentNumber);
        currentTextField.textContent = answer;
    } else if (operator == "×") {
        answer = multiply(previousNumber, currentNumber);
        currentTextField.textContent = answer;
    } else if (operator == "÷") {
        answer = divide(previousNumber, currentNumber);
        if(currentNumber == 0){
            resetCalculator();
        }else{
            currentTextField.textContent = answer;
        }
    }else if(operator == undefined){
        previousTextField.textContent = parseFloat(currentTextField.textContent) + "" + "=";
    }
    if(operator!=undefined){
        previousTextField.textContent = `${previousNumber} ${operator} ${currentNumber} =`;
    }
}

// When answer is infinity
function resetCalculator(){
    currentTextField.textContent = "Cannot divide by zero";
    allButtons.forEach((button)=>{
        if(!button.classList.contains("number") && !button.classList.contains("clearButton") && !button.classList.contains("equals")){
            button.setAttribute("disabled", "");
        }else{
            button.addEventListener("click", ()=> location.reload());
        }
    })
}

function displayOutput() {
    let newNumber = false;
    let toggleCompute = false;
    currentTextField.textContent = "0";  
    operandButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if(currentTextField.textContent == "0" && button.textContent == "."){
                currentTextField.textContent += button.textContent;
            }
            if(currentTextField.textContent.includes(".") && button.textContent == ".") return;
            if (newNumber) {
                toggleCompute = true;
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
            if (isNaN(previousNumber)) {
                previousNumber = "";
            }
            if(toggleCompute){
                compute();
                toggleCompute = false;
            }
            previousTextField.textContent = `${currentTextField.textContent} ${button.textContent}`;
            operator = button.textContent;
            currentNumber = parseFloat(currentTextField.textContent);
            previousNumber = parseFloat(previousTextField.textContent);
        })
    })

    equalsButton.addEventListener("click", () => {
        previousNumber = parseFloat(previousTextField.textContent);
        currentNumber = parseFloat(currentTextField.textContent);
        compute();
    })
}

function deleteNumber(){
    currentTextField.textContent = currentTextField.textContent.slice(0, -1);
    if(currentTextField.textContent == ""){
        currentTextField.textContent = 0;
    }
}

function clearAll(){
    currentTextField.textContent = "0";
    previousTextField.textContent = "";
    operator = null;
}

function clearEntry(){
    currentTextField.textContent = "0";
}

function displayZero(){
    if(currentTextField.textContent == ""){
        currentTextField.textContent = "0";
    }
}

deleteButton.addEventListener("click", deleteNumber);
clearAllButton.addEventListener("click", clearAll);
clearEntryButton.addEventListener("click", clearEntry);
displayOutput();
