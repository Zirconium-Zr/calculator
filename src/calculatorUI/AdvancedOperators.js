import { assignOperands } from "../calculatorLogic/CalculatorState.js";
import { bigTextField, smallTextField } from "./dom.js";

export function changeSign() {
  bigTextField.textContent = `-${bigTextField.textContent}`;
  assignOperands(bigTextField.textContent);
}
