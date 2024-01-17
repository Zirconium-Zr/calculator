import { bigTextField } from "./dom.js";

export function displayNumbers(number) {
  bigTextField.textContent = number;
}

export function displayOperators(operator) {
  bigTextField.textContent = operator;
}
