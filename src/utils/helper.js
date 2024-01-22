import { initialiseCalculator } from "../calculatorLogic/calculator.js";

export function convertOperatorSign(operator, signFor) {
  if (signFor === "Calculator") {
    switch (operator) {
      case "+":
        return "+";
      case "−":
        return "-";
      case "×":
        return "*";
      case "÷":
        return "/";
      case "":
        return "No operator";
    }
  }

  if (signFor === "DOM") {
    switch (operator) {
      case "+":
        return "+";
      case "-":
        return "−";
      case "*":
        return "×";
      case "/":
        return "÷";
      case "":
        return "No operator";
    }
  }
}

export function checkForInvalidAnswer(answer, textField) {
  initialiseCalculator();
  // After dividing 0 by 0
  if (isNaN(answer)) return (textField.textContent = "Result is undefined");
  // After dividing any number by 0
  if (!isFinite(answer)) return (textField.textContent = "Cannot divide by zero");
}
