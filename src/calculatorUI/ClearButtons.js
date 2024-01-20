import { bigTextField } from "./dom.js";

export function backSpace() {
  bigTextField.textContent = bigTextField.textContent.slice(0, -1);
  if (bigTextField.textContent === "") bigTextField.textContent = "0";
}
