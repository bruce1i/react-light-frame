import { noop } from "./noop";

test("calls a noop function", () => {
  expect(noop()).toBeUndefined();
  expect(noop.toString().replace(/\s/g, "")).toBe("functionnoop(){}");
});
