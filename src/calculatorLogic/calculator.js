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

export let firstNumber = "",
  secondNumber = "",
  operatorSign = "";

let switchToSecondNumber = false;

export function getOperands(operand) {
  if (!switchToSecondNumber) firstNumber = operand;
  else secondNumber = operand;
  console.log({ firstNumber, secondNumber });
}

export function getOperator(operator) {
  operatorSign = operator;
  if (operatorSign !== "") switchToSecondNumber = true;
}

export function getAnswer() {
  return operate(firstNumber, secondNumber, operatorSign);
}
