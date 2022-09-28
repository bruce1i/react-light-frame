import { noop } from "./noop";

test("calls a noop function", () => {
  expect(noop.toString()).toBe("function noop() { }");
});
