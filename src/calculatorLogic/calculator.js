import { convertOperatorSign } from "../utils/helper.js";

function add(x, y) {
  return x + y;
}
function subtract(x, y) {
  return x - y;
}
function multiply(x, y) {
  return x * y;
}
function divide(x, y) {
  return x / y;
}

export function operate(firstNumber, secondNumber, operator) {
  switch (operator) {
    case "+":
      return add(parseFloat(firstNumber), parseFloat(secondNumber));
    case "-":
      return subtract(parseFloat(firstNumber), parseFloat(secondNumber));
    case "*":
      return multiply(parseFloat(firstNumber), parseFloat(secondNumber));
    case "/":
      return divide(parseFloat(firstNumber), parseFloat(secondNumber));
  }
}

export let firstNumber = "0",
  secondNumber = "",
  operatorSign = "",
  answer = "";

let switchToSecondNumber = false,
  displayedAnswer = false,
  resetSecondNumber = false;

export function assignOperands(operand) {
  if (!switchToSecondNumber) firstNumber = operand;
  else secondNumber = operand;
  console.log({ firstNumber, secondNumber, operatorSign, switchToSecondNumber });
  return { firstNumber, secondNumber };
}

export function assignOperator(operator) {
  operatorSign = convertOperatorSign(operator, "Calculator");
  switchToSecondNumber = true;

  // If user selects operator while the answer is on the screen
  if (displayedAnswer) {
    displayedAnswer = false;
    // Reset the second number so that the second number will be the new number that will be provided after selecting the operator. However, the second number will be replaced after clicking equals to sign
    resetSecondNumber = true;
  }
  console.log({ firstNumber, secondNumber, operatorSign, switchToSecondNumber });
  return { operatorSign };
}

export function getAnswer() {
  if (operatorSign === "" || operatorSign === "No operator") return firstNumber;
  if (secondNumber === "" || resetSecondNumber) {
    secondNumber = firstNumber;
    resetSecondNumber = false;
  }
  switchToSecondNumber = false;
  displayedAnswer = true;
  answer = operate(firstNumber, secondNumber, operatorSign);
  console.log({ firstNumber, secondNumber, operatorSign, switchToSecondNumber, answer });
  return answer;
}
