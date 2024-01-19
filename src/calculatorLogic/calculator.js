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
  gotAnswer = false,
  replaceSecondNumber = false;

export let evaluatePairs = false; // To evaluate initial operands if third operand is provided

export function assignOperands(operand) {
  if (!switchToSecondNumber) firstNumber = operand;
  else {
    secondNumber = operand;
    // Set replace second number to false if new input is provided instead of using already present value on screen
    replaceSecondNumber = false;
  }

  // Set evaluatePairs to true if secondNumber is available so that the pairs can be evaluated when user clicks on any operator afterwards
  if (secondNumber !== "") evaluatePairs = true;

  console.log({ firstNumber, secondNumber, operatorSign, switchToSecondNumber });
  return { firstNumber, secondNumber };
}

export function assignOperator(operator) {
  // Evaluate two available operands
  if (evaluatePairs) getAnswer();

  operatorSign = convertOperatorSign(operator, "Calculator");
  switchToSecondNumber = true;
  // evaluatePairs = true;

  // If user selects operator while the answer is on the screen
  if (gotAnswer) {
    gotAnswer = false;
    // Replace the second number so that the second number will be the new number that will be provided after selecting the operator. However, the second number will be replaced after clicking equals to sign
    replaceSecondNumber = true;
  }
  console.log({ firstNumber, secondNumber, operatorSign, switchToSecondNumber });
  return { operatorSign };
}

export function getAnswer() {
  switchToSecondNumber = false;
  gotAnswer = true;

  if (operatorSign === "" || operatorSign === "No operator") return firstNumber;
  if (secondNumber === "" || replaceSecondNumber) {
    secondNumber = firstNumber;
    replaceSecondNumber = false;
  }

  answer = operate(firstNumber, secondNumber, operatorSign);

  if (evaluatePairs) {
    firstNumber = answer;
    evaluatePairs = false;
  }
  console.log({ firstNumber, secondNumber, operatorSign, switchToSecondNumber, answer });
  return answer;
}
