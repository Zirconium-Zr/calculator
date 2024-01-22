import { assignOperands } from "../calculatorLogic/calculator.js";
import { bigTextField, smallTextField } from "./dom.js";

export function changeSign() {
  bigTextField.textContent = `-${bigTextField.textContent}`;
  assignOperands(bigTextField.textContent);
}
