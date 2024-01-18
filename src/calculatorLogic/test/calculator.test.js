import { operate, assignOperands, assignOperator, getAnswer } from "../calculator.js";

describe("Basic calculator logic", () => {
  test("Returns 2 + 3 to equal 5", () => {
    expect(operate(2, 3, "+")).toBe(5);
  });

  test("Returns 2 - 3 to equal -1", () => {
    expect(operate(2, 3, "-")).toBe(-1);
  });

  test("Returns 2 * 3 to equal 6", () => {
    expect(operate(2, 3, "*")).toBe(6);
  });

  test("Returns 9 / 3 to equal 3", () => {
    expect(operate(9, 3, "/")).toBe(3);
  });
});

describe("Variable values and operators", () => {
  test("Assigns first operand", () => {
    expect(assignOperands("10").firstNumber).toBe("10");
    expect(assignOperands("10").secondNumber).toBe("");
  });

  test("Recieves the operator and assigns the value to second operand", () => {
    expect(assignOperands("10").firstNumber).toBe("10");
    expect(assignOperator("+").operatorSign).toBe("+");
    expect(assignOperands("8").secondNumber).toBe("8");
  });

  test("Checks for invalid operator", () => {
    expect(assignOperands("10").firstNumber).toBe("10");
    expect(assignOperator("").operatorSign).toBe("No operator");
    expect(getAnswer()).toBe("10");
  });
});

describe("Check answer", () => {
  test("Return answer 20 for 10 + 10", () => {
    expect(assignOperands("10").firstNumber).toBe("10");
    expect(assignOperator("+").operatorSign).toBe("+");
    expect(assignOperands("8").secondNumber).toBe("8");
    expect(getAnswer()).toBe(18);
  });

  test("Returns -3 for 2 - 5", () => {
    expect(assignOperands("2").firstNumber).toBe("2");
    expect(assignOperator("−").operatorSign).toBe("-");
    expect(assignOperands("5").secondNumber).toBe("5");
    expect(getAnswer()).toBe(-3);
  });

  test("Returns 15 for 5 * 3", () => {
    expect(assignOperands("5").firstNumber).toBe("5");
    expect(assignOperator("×").operatorSign).toBe("*");
    expect(assignOperands("3").secondNumber).toBe("3");
    expect(getAnswer()).toBe(15);
  });

  test("Returns 4 for 8 / 2", () => {
    expect(assignOperands("8").firstNumber).toBe("8");
    expect(assignOperator("÷").operatorSign).toBe("/");
    expect(assignOperands("2").secondNumber).toBe("2");
    expect(getAnswer()).toBe(4);
  });
});
