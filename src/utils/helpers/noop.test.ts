import { noop } from "./noop";

test("It's noop function", () => {
  expect(noop.toString()).toBe("function noop() {\n    // No operation performed.\n}");
});
