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
    expect(assignOperator("+").operatorSign).toBe("+");
    expect(assignOperands("10").firstNumber).toBe("10");
    expect(assignOperands("10").secondNumber).toBe("10");
  });

  test("Return answer 20 for 10 + 10", () => {
    expect(assignOperands("10").firstNumber).toBe("10");
    expect(assignOperator("+").operatorSign).toBe("+");
    expect(assignOperands("10").secondNumber).toBe("10");
    expect(getAnswer()).toBe(20);
  });
});
