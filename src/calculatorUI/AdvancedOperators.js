import { assignOperands, switchToSecondNumber, secondNumber } from "../calculatorLogic/CalculatorState.js";
import { bigTextField, smallTextField } from "./dom.js";
import { resetCalculator, isOperatorActive, isOperandActive } from "./NumbersAndOperators.js";
import { negateSign } from "../calculatorLogic/CalculatorOperation.js";

// To replace value of smallTextField by bigTextField value (answer)
// Replace only after computation is done (if changeSign button is clicked)
export let replaceSmallTextField = true;
export let isAdvancedOperator = false;

let string = "",
  newString = "";

export function displayChangeSign() {
  // If user clicks changeSign button after performing an operation by clicking equals to button
  // resetCalculator becomes true only when equals to button is clicked
  if (!isOperatorActive && !isOperandActive && replaceSmallTextField) {
    smallTextField.textContent = bigTextField.textContent;
    console.log("1");
  }

  // If user clicks equals to button
  if (!isOperandActive && !isOperatorActive) {
    replaceSmallTextField = false;
    smallTextField.textContent = `negate(${smallTextField.textContent.replace("=", "").replace(/\s/g, "")})`;
    console.log("2");
  }
  // If user has selected operator but has not assigned second operator yet and clicks on change sign button
  else if (secondNumber === "" && isOperatorActive) {
    string = ` negate(${smallTextField.textContent.slice(0, -1).replace(/\s/g, "")})`;
    smallTextField.textContent += string;
    replaceSmallTextField = false;
    console.log("3");
  }
  // Once second operand is assigned and user clicks on change sign button multiple times
  else if (secondNumber !== "" && isOperatorActive) {
    if (string === "") {
      string = ` negate(${smallTextField.textContent.slice(0, 1)})`;
      // string = smallTextField.textContent.slice(0, 1);
      console.log(string);
      smallTextField.textContent += string;
    } else {
      // prevString = string;
      newString = ` negate(${string.replace(/\s/g, "")})`;
      console.log({ newString, string });
      smallTextField.textContent = smallTextField.textContent.replace(string, newString);
      string = newString;
    }
    replaceSmallTextField = false;
    console.log("4");
  }

  bigTextField.textContent = `${negateSign(bigTextField.textContent)}`;

  assignOperands(bigTextField.textContent);
}
