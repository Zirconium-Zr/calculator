import { clearValues } from "./ClearButtons.js";
import { displayNumbers, displayOperators, displayAnswer } from "./NumbersAndOperators.js";
import { disableButtons } from "../calculatorUI/NumbersAndOperators.js";
import { displayChangeSign } from "./AdvancedOperators.js";

const buttons = document.querySelectorAll("button");
export const bigTextField = document.querySelector(".big-text");
export const smallTextField = document.querySelector(".small-text");

window.onload = () => {
  bigTextField.textContent = "0";
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("number") || button.classList.contains("dot")) {
      displayNumbers(button.textContent);
      toggleButtonStatus(disableButtons);
    } else if (button.classList.contains("operator")) {
      displayOperators(button.textContent);
      toggleButtonStatus(disableButtons);
    } else if (button.classList.contains("equals")) {
      displayAnswer();
      toggleButtonStatus(disableButtons);
    } else if (
      button.classList.contains("delete") ||
      button.classList.contains("clearAll") ||
      button.classList.contains("clearEntry")
    ) {
      clearValues(button.className);
      if (disableButtons) {
        toggleButtonStatus(false);
        // Pass clearAll value directly to clear everything on screen and restart
        clearValues("clearAll");
      }
    } else if (button.classList.contains("plusMinus")) {
      displayChangeSign();
    }
  });
});

// Disable buttons when answer is NaN
function toggleButtonStatus(disableButtons) {
  buttons.forEach((button) => {
    if (
      disableButtons &&
      !button.classList.contains("number") &&
      !button.classList.contains("clearButton") &&
      !button.classList.contains("equals")
    ) {
      button.setAttribute("disabled", "");
    } else if (!disableButtons) {
      if (button.hasAttribute("disabled")) button.removeAttribute("disabled");
    }
  });
}
