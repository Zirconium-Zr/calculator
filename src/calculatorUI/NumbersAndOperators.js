import { bigTextField, smallTextField } from "./dom.js";
import {
  assignOperands,
  evaluateAnswer,
  firstNumber,
  secondNumber,
  operatorSign,
  answer,
  assignOperator,
  initialiseCalculator,
} from "../calculatorLogic/CalculatorState.js";
import { checkForInvalidAnswer, convertOperatorSign } from "../utils/helper.js";
import { initialseAdvancedOperatorStates, isAdvancedOperator, newString, string } from "./AdvancedOperators.js";

export let newInput = false,
  resetCalculator = false,
  disableButtons = false,
  // For advanced operators UI to know if operator or operand is currently active or not.
  // Only active when nothing is pressed except operator.
  isOperatorActive = false,
  //Only active when nothing is pressed except operand.
  isOperandActive = false;

export function displayNumbers(number) {
  disableButtons = false;
  isOperatorActive = false;
  isOperandActive = true;

  // After user clicks equals to button and selects a number right after
  if (resetCalculator) {
    resetCalculator = false;
    smallTextField.textContent = "";
  }

  // Replace bigTextField with zero and decimal if user clicks on decimal after selecting an operator
  if (number === "." && newInput) {
    bigTextField.textContent = `0${number}`;
    newInput = false;
  }

  // Do not let decimal appear more than once
  if (number === "." && bigTextField.textContent.includes(".")) return assignOperands(bigTextField.textContent);

  // Replace initial zero with clicked number except when user clicks on decimal button or zero
  if (bigTextField.textContent === "0" && number !== ".") {
    bigTextField.textContent = number;
    newInput = false;
  } else {
    // Replace bigTextField values with new input values if user clicks on any number buttons except decimal after selecting an operator
    if (newInput) {
      bigTextField.textContent = number;
      newInput = false;
    } else bigTextField.textContent += number;
  }

  assignOperands(bigTextField.textContent);
}

export function displayOperators(operator) {
  newInput = true;
  isOperatorActive = true;
  isOperandActive = false;

  // Do not reset calculator if user selects operator. It will prevent smallTextField value from being empty
  resetCalculator = false;

  // When user presses operator button
  bigTextField.textContent = `${parseFloat(bigTextField.textContent)}`;
  smallTextField.textContent = `${parseFloat(bigTextField.textContent)} ${operator}`;

  assignOperator(operator);

  // For continuous calculations
  // This part has to be placed after assignOperator function so that answer can be calculated and displayed as soon as another operator button is pressed
  if (answer !== "") {
    bigTextField.textContent = `${answer}`;
    smallTextField.textContent = `${parseFloat(bigTextField.textContent)} ${operator}`;
  }

  // When user does something like dividing 0 by 0
  if (isNaN(answer)) {
    // Used secondNumber variable to show the operation instead of firstVariable because firstVariable will get replaced by answer and will return NaN
    smallTextField.textContent = `${secondNumber} ÷ ${secondNumber} =`;
    checkForInvalidAnswer(answer, bigTextField);
    disableButtons = true;
  }
}

export function displayAnswer() {
  // The reason to call the function "evaluateAnswer()" instead of the variable "answer" is so that the function can get receive operands, perform operation and finally give answer
  bigTextField.textContent = parseFloat(evaluateAnswer());

  // Check if user clicks equals to sign without providing an operator
  // If there is no operator, just return the number on screen as answer
  if (operatorSign === "" || operatorSign === "No operator") smallTextField.textContent = `${parseFloat(evaluateAnswer())}`;
  // if some special operator was clicked before clicking on equals to button
  else if (isAdvancedOperator) {
    if (smallTextField.textContent.includes("negate")) {
      // If there is a situation where calculation is "8 + negate(8)" or anything like that where negate is after a number, the if block will prevent screen's text to become "8 + negate(8) + 8 =" and will instead show "8 + negate(8) =". The if block will always run after continuous operation (firstNumber + secondNumber + negate(answer))
      // The else block will make the text to become "negate(8) + secondNumber = " if user clicks on equals to button after doing negate of previous operation's answer.
      if (isOperatorActive) {
        smallTextField.textContent = `${smallTextField.textContent}`;
      } else {
        smallTextField.textContent = `${smallTextField.textContent} ${convertOperatorSign(operatorSign, "DOM")} ${secondNumber}`;
      }
    } else {
      smallTextField.textContent = `${parseFloat(firstNumber)} ${convertOperatorSign(operatorSign, "DOM")} ${parseFloat(
        secondNumber // Not sure why prettier formatted it in a weird way here
      )}`;
    }
    console.log({ newString, string });
    console.log({ isOperandActive, isOperatorActive });
    initialseAdvancedOperatorStates();
  } else {
    smallTextField.textContent = `${parseFloat(firstNumber)} ${convertOperatorSign(operatorSign, "DOM")} ${parseFloat(
      secondNumber // Not sure why prettier formatted it in a weird way here
    )}`;
    // If user clicks equals to sign continuously.
    assignOperands(bigTextField.textContent);
  }

  smallTextField.textContent += " =";

  // When user does something like dividing by 0
  // We are using firstNumber to check the condition because after perfoming operation firstNumber will be replaced by answer.
  // So it is just like checking answer. We can't use answer variable because it is still emtpy at this phase.
  if (isNaN(firstNumber) || !isFinite(firstNumber)) {
    checkForInvalidAnswer(firstNumber, bigTextField);
    disableButtons = true;
  }
  // if (isNaN(evaluateAnswer())) return (bigTextField.textContent = "Result is undefined");
  resetCalculator = true;
  newInput = true;
  disableButtons = false;
  isOperatorActive = false;
  isOperandActive = false;
}
