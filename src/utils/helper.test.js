import { convertOperatorSign } from "./helper.js";

describe("Convert operator signs for calculator", () => {
  test("Converts × to * (Multiply sign)", () => {
    expect(convertOperatorSign("×", "Calculator")).toBe("*");
  });

  test("Converts ÷ to / (Division sign)", () => {
    expect(convertOperatorSign("÷", "Calculator")).toBe("/");
  });

  test("Converts − to - (Minus sign)", () => {
    expect(convertOperatorSign("−", "Calculator")).toBe("-");
  });

  test("Converts + to + (Addition sign)", () => {
    expect(convertOperatorSign("+", "Calculator")).toBe("+");
  });
});

describe("Convert operator signs for DOM", () => {
  test("Converts * to × (Multiply sign)", () => {
    expect(convertOperatorSign("*", "DOM")).toBe("×");
  });

  test("Converts / to ÷ (Division sign)", () => {
    expect(convertOperatorSign("/", "DOM")).toBe("÷");
  });

  test("Converts - to − (Minus sign)", () => {
    expect(convertOperatorSign("-", "DOM")).toBe("−");
  });

  test("Converts + to + (Addition sign)", () => {
    expect(convertOperatorSign("+", "DOM")).toBe("+");
  });
});
