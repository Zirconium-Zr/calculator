import { bigTextField, smallTextField } from "./dom.js";

export function displayNumbers(number) {
  // Do not let decimal appear more than once
  if (number === "." && bigTextField.textContent.includes(".")) return;

  // Replace initial zero with clicked number except when user clicks on decimal button
  if (bigTextField.textContent === "0" && number !== ".") {
    bigTextField.textContent = number;
  } else {
    bigTextField.textContent += number;
  }
}

export function displayOperators(operator) {
  bigTextField.textContent = operator;
}
