const buttons = document.querySelectorAll("button");
const bigTextField = document.querySelector(".big-text");
const smallTextField = document.querySelector(".small-text");

window.onload = () => {
  bigTextField.textContent = "0";
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("number")) {
      console.log(button.textContent);
    } else if (button.classList.contains("operator")) {
      console.log(button.textContent);
    }
  });
});
