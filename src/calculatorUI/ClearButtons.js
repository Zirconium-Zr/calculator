import { assignOperands, initialiseCalculator, displayedAnswer } from "../calculatorLogic/CalculatorState.js";
import { bigTextField, smallTextField } from "./dom.js";
import { newInput } from "./NumbersAndOperators.js";

export function clearValues(clearType) {
  if (clearType.includes("delete")) {
    if (displayedAnswer) return (smallTextField.textContent = "");
    if (newInput) return;
    bigTextField.textContent = bigTextField.textContent.slice(0, -1);
    if (bigTextField.textContent === "") bigTextField.textContent = "0";
  } else if (clearType.includes("clearAll")) {
    bigTextField.textContent = "0";
    smallTextField.textContent = "";
    initialiseCalculator();
  } else if (clearType.includes("clearEntry")) bigTextField.textContent = "0";
  assignOperands(bigTextField.textContent);
}
