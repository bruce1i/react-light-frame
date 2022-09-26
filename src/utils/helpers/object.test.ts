import { objectElseEmpty } from "./object";

describe("objectElseEmpty", () => {
  it("will return object when the condition is true", () => {
    expect(objectElseEmpty({ bar: "bar" }, true)).toEqual({ bar: "bar" });
    expect(objectElseEmpty("bar", true)).toEqual({ bar: "" });
  });

  it("will return empty object when the condition is false", () => {
    expect(objectElseEmpty({ bar: "bar" }, false)).toEqual({});
    expect(objectElseEmpty("bar", false)).toEqual({});
  });
});
