import { operate } from "./calculator.js";

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
