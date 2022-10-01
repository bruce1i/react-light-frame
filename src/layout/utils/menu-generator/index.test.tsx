import { render, screen } from "@testing-library/react";

import type { IIconMenu } from "@/types/menu";

import { menuGenerator } from "./index";

describe("icon button", () => {
  test("renders correctly", () => {
    const icon: IIconMenu = {
      kind: "icon",
      icon: <div>test-icon-el</div>,
    };

    const view = render(menuGenerator(icon, 0));

    expect(screen.getByTestId("main")).toHaveClass("main", "disable_hover");
    expect(screen.getByText("test-icon-el")).toBeInTheDocument();
    expect(view).toMatchSnapshot();
  });

  test.todo("can hover");
});
