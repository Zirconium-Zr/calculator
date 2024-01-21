export let disableButton = false;

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
  disableButton = true;
  if (isNaN(answer)) return (textField.textContent = "Result is undefined");
}
