import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { IIconMenu, IButtonMenu } from "@/types/menu";

import { menuGenerator } from "./index";

describe("icon menu", () => {
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

describe("button menu", () => {
  test("renders correctly", () => {
    const mockClick = jest.fn();
    const button: IButtonMenu = {
      kind: "button",
      icon: <div>test-icon-el</div>,
      useClick: () => mockClick,
    };

    const view = render(menuGenerator(button, 0));

    expect(mockClick.mock.calls.length).toBe(0);
    expect(view).toMatchSnapshot();
  });

  test("should show tooltip when hover", async () => {
    const user = userEvent.setup();
    const mockClick = jest.fn();
    const button: IButtonMenu = {
      kind: "button",
      name: "test-name",
      icon: <div>test-icon-el</div>,
      useClick: () => mockClick,
    };

    render(menuGenerator(button, 0));

    expect(screen.queryByText("test-name")).not.toBeInTheDocument();

    await user.hover(screen.getByTestId("main"));

    expect(screen.getByText("test-name")).toBeInTheDocument();
  });

  test("can click", async () => {
    const user = userEvent.setup();
    const mockClick = jest.fn();
    const button: IButtonMenu = {
      kind: "button",
      icon: <div>test-icon-el</div>,
      useClick: () => mockClick,
    };

    render(menuGenerator(button, 0));
    await user.click(screen.getByTestId("main"));

    expect(mockClick.mock.calls.length).toBe(1);
  });
});
