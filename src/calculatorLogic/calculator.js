import { newInput } from "../calculatorUI/NumbersAndOperators.js";
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

export let firstNumber,
  secondNumber,
  operatorSign,
  answer,
  switchToSecondNumber,
  displayedAnswer,
  replaceFirstNumber, // To replace firstNumber with answer for continuous calculation
  replaceSecondNumber,
  evaluatePairs;

export function initialiseCalculator() {
  firstNumber = "0";
  secondNumber = "";
  operatorSign = "";
  answer = "";
  switchToSecondNumber = false;
  displayedAnswer = false;
  replaceFirstNumber = false;
  replaceSecondNumber = false;
  evaluatePairs = false;
}

window.addEventListener("load", initialiseCalculator);

export function assignOperands(operand) {
  if (!switchToSecondNumber) firstNumber = operand;
  else {
    secondNumber = operand;
    // Set replace second number to false if new input is provided instead of using already present value in screen
    replaceSecondNumber = false;
    evaluatePairs = true;
  }

  // Make answer empty when new input is provided so that if there is already an answer, it wont look like the answer has overwritten the new input when user selects operator. This is an UI problem, the actual operand wont be overwritten
  if (!evaluatePairs) answer = "";
  console.log({ firstNumber, secondNumber, operatorSign, switchToSecondNumber });
  return { firstNumber, secondNumber };
}

export function assignOperator(operator) {
  if (evaluatePairs) {
    replaceFirstNumber = true;
    evaluateAnswer();
  }
  operatorSign = convertOperatorSign(operator, "Calculator");
  switchToSecondNumber = true;

  // If user selects operator while the answer is on the screen
  if (displayedAnswer) {
    displayedAnswer = false;
    // Replace the second number so that the second number will be the new number that will be provided after selecting the operator. However, the second number will be replaced after clicking equals to sign
    replaceSecondNumber = true;
  }
  console.log({ firstNumber, secondNumber, operatorSign, switchToSecondNumber });
  return { operatorSign };
}

export function evaluateAnswer() {
  if (operatorSign === "" || operatorSign === "No operator") return firstNumber;
  if (secondNumber === "" || replaceSecondNumber) {
    secondNumber = firstNumber;
    replaceSecondNumber = false;
  }
  switchToSecondNumber = false;
  displayedAnswer = true;
  answer = operate(firstNumber, secondNumber, operatorSign);

  // For continuous calculation when user presses operator button after assigning second operand
  if (evaluatePairs && replaceFirstNumber) firstNumber = answer;
  replaceFirstNumber = false;
  evaluatePairs = false;

  console.log({ firstNumber, secondNumber, operatorSign, switchToSecondNumber, answer });
  return answer;
}
