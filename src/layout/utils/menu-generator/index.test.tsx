import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

  test("should show tooltip when hover", async () => {
    const user = userEvent.setup();

    const icon: IIconMenu = {
      kind: "icon",
      name: "test-name",
      icon: <div>test-icon-el</div>,
    };

    render(menuGenerator(icon, 0));

    expect(screen.queryByText("test-name")).not.toBeInTheDocument();

    await user.hover(screen.getByTestId("main"));

    expect(screen.getByText("test-name")).toBeInTheDocument();
  });
});
