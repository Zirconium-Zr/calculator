import { bigTextField, smallTextField } from "./dom.js";
import {
  assignOperands,
  getAnswer,
  firstNumber,
  secondNumber,
  operatorSign,
  assignOperator,
} from "../calculatorLogic/calculator.js";

let newInput = false,
  resetCalculator = false;

export function displayNumbers(number) {
  // Replace bigTextField with zero and decimal if user clicks on decimal after selecting an operator
  if (number === "." && newInput) {
    bigTextField.textContent = `0${number}`;
    newInput = false;
    return;
  }

  // Do not let decimal appear more than once
  if (number === "." && bigTextField.textContent.includes(".")) return;

  // Replace initial zero with clicked number except when user clicks on decimal button or zero
  if (bigTextField.textContent === "0" && number !== ".") {
    bigTextField.textContent = number;
  } else {
    // Replace bigTextField values with new input values if user clicks on any number buttons except decimal after selecting an operator
    if (newInput) {
      bigTextField.textContent = number;
      newInput = false;
    } else bigTextField.textContent += number;
  }

  // After user clicks equals to button
  if (resetCalculator) {
    resetCalculator = false;
    bigTextField.textContent = number;
    smallTextField.textContent = "";
  }

  assignOperands(bigTextField.textContent);
}

export function displayOperators(operator) {
  newInput = true;
  smallTextField.textContent = `${bigTextField.textContent} ${operator}`;

  assignOperator(operator);
}

export function displayAnswer() {
  smallTextField.textContent = `${firstNumber} ${operatorSign} ${secondNumber} =`;
  bigTextField.textContent = getAnswer();
  resetCalculator = true;
}
