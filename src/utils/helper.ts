export function objectElseEmpty(objOrKey: object | string, condition: boolean) {
  if (!condition) return {};

  return typeof objOrKey === "object" ? objOrKey : { [objOrKey]: "" };
}
