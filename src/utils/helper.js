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
