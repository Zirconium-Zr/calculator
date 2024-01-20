import { assignOperands, controlClear, displayedAnswer } from "../calculatorLogic/calculator.js";
import { bigTextField, smallTextField } from "./dom.js";
import { newInput } from "./NumbersAndOperators.js";

export let clearValues = false;

export function backSpace() {
  if (displayedAnswer) return (smallTextField.textContent = "");
  if (newInput) return;
  bigTextField.textContent = bigTextField.textContent.slice(0, -1);
  if (bigTextField.textContent === "") bigTextField.textContent = "0";

  assignOperands(bigTextField.textContent);
}

export function clearAll() {
  bigTextField.textContent = "0";
  smallTextField.textContent = "";
  clearValues = true;
  controlClear();
  clearValues = false;

  assignOperands(bigTextField.textContent);
}
