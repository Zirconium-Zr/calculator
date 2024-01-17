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
  operatorSign = "",
  answer = "";

let switchToSecondNumber = false;

export function assignOperands(operand) {
  if (!switchToSecondNumber) {
    firstNumber = operand;
    secondNumber = "";
  } else secondNumber = operand;
  console.log({ firstNumber, secondNumber, operatorSign, switchToSecondNumber });
  return { firstNumber, secondNumber };
}

export function assignOperator(operator) {
  operatorSign = operator;
  if (operatorSign !== "") switchToSecondNumber = true;
  console.log({ firstNumber, secondNumber, operatorSign, switchToSecondNumber });
  return { operatorSign };
}

export function getAnswer() {
  if (secondNumber === "") secondNumber = firstNumber;
  switchToSecondNumber = false;
  console.log({ firstNumber, secondNumber, operatorSign, switchToSecondNumber });
  return (answer = operate(firstNumber, secondNumber, operatorSign));
}
