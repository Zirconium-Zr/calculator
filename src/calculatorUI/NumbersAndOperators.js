import { bigTextField, smallTextField } from "./dom.js";
import {
  assignOperands,
  getAnswer,
  firstNumber,
  secondNumber,
  operatorSign,
  answer,
  assignOperator,
  initialiseCalculator,
} from "../calculatorLogic/calculator.js";
import { checkForInvalidAnswer, convertOperatorSign } from "../utils/helper.js";

export let newInput = false,
  resetCalculator = false,
  disableButtons = false;

export function displayNumbers(number) {
  disableButtons = false;
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
  disableButtons = false;
  // The reason to call the function "getAnswer()" instead of the variable "answer" is so that the function can get receive operands, perform operation and finally give answer
  bigTextField.textContent = parseFloat(getAnswer());

  // Check if user clicks equals to sign without providing an operator
  // If there is no operator, just return the number on screen as answer
  if (operatorSign === "" || operatorSign === "No operator") smallTextField.textContent = `${parseFloat(getAnswer())} =`;
  else {
    smallTextField.textContent = `${parseFloat(firstNumber)} ${convertOperatorSign(operatorSign, "DOM")} ${parseFloat(
      secondNumber // Not sure why prettier formatted it in a weird way here
    )} =`;
    // If user clicks equals to sign continuously.
    assignOperands(bigTextField.textContent);
  }

  // When user does something like dividing 0 by 0
  // We are using firstNumber to check the condition because after perfoming operation firstNumber will be replaced by answer.
  // So it is just like checking answer. We can't use answer variable because it is still emtpy at this phase.
  if (isNaN(firstNumber)) {
    checkForInvalidAnswer(firstNumber, bigTextField);
    disableButtons = true;
  }
  // if (isNaN(getAnswer())) return (bigTextField.textContent = "Result is undefined");
  resetCalculator = true;
  newInput = true;
}
