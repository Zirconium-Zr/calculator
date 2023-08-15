let firstNumber = +prompt("Enter first number");
let secondNumber = +prompt("Enter second number");
let operator = prompt("Enter operator");
let answer;

function operate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case "+":
            add(firstNumber, secondNumber);
            break;
        case "-":
            subtract(firstNumber, secondNumber);
            break;
        case "*":
            multiply(firstNumber, secondNumber);
            break;
        case "/":
            divide(firstNumber, secondNumber);
            break;
        default:
            console.log("Invalid");
    }
}

operate(firstNumber, secondNumber, operator);

function add(x, y) {
    answer = x + y;
    console.log(answer);
}
function subtract(x, y) {
    answer = x - y;
    console.log(answer);
}
function multiply(x, y) {
    answer = x * y;
    console.log(answer);
}
function divide(x, y) {
    answer = x / y;
    console.log(answer);
}

// let first = prompt("Enter number");
// let second = prompt("Enter number");

// function yes(first, second){
//     ok(first, second);
// }
// yes(first, second);

// function ok(first, second){
//     console.log(first, second);
// }

