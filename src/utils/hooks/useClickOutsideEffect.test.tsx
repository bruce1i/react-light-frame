import { useRef } from "react";
import { renderSetup, screen } from "rlf-test-utils";

import { useClickOutsideEffect } from "./useClickOutsideEffect";

const mockClick = jest.fn();

function CustomTestWrapper() {
  const ref = useRef();

  useClickOutsideEffect(ref, () => {
    mockClick();
  });

  return (
    <div data-testid="outside">
      <div data-testid="main" ref={ref}></div>
    </div>
  );
}

test("useClickOutsideEffect", async () => {
  const { user } = renderSetup(<CustomTestWrapper />);

  await user.click(screen.getByTestId("main"));

  expect(mockClick.mock.calls.length).toBe(0);

  await user.click(screen.getByTestId("outside"));

  expect(mockClick.mock.calls.length).toBe(1);
});
