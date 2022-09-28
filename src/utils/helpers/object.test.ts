import { objectElseEmpty } from "./object";

describe("objectElseEmpty", () => {
  it("should return object when the condition is true", () => {
    expect(objectElseEmpty({ bar: "bar" }, true)).toStrictEqual({ bar: "bar" });
    expect(objectElseEmpty("bar", true)).toStrictEqual({ bar: "" });
  });

  it("should return empty object when the condition is false", () => {
    expect(objectElseEmpty({ bar: "bar" }, false)).toStrictEqual({});
    expect(objectElseEmpty("bar", false)).toStrictEqual({});
  });
});
