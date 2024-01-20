import { backSpace } from "./ClearButtons.js";
import { displayNumbers, displayOperators, displayAnswer } from "./NumbersAndOperators.js";

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
    } else if (button.classList.contains("operator")) {
      displayOperators(button.textContent);
    } else if (button.classList.contains("equals")) {
      displayAnswer();
    } else if (button.classList.contains("delete")) {
      backSpace();
    }
  });
});
