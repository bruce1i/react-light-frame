import { render, renderWithSetup, screen } from "rlf-test-utils";

import type { IIconMenu, IButtonMenu, INavMenu } from "@/types/menu";

import { menuGenerator } from "./index";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => {
  mockNavigate.mockReset();
});

describe("icon menu", () => {
  test("renders correctly", () => {
    const icon: IIconMenu = {
      kind: "icon",
      icon: <div>test-icon-el</div>,
    };

    const { asFragment } = render(menuGenerator(icon, 0));

    expect(screen.getByTestId("main")).toHaveClass("main", "disable_hover");
    expect(screen.getByText("test-icon-el")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("should show tooltip when hover", async () => {
    const icon: IIconMenu = {
      kind: "icon",
      name: "test-name",
      icon: <div>test-icon-el</div>,
    };

    const { user } = renderWithSetup(menuGenerator(icon, 0));

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

    const { asFragment } = render(menuGenerator(button, 0));

    expect(mockClick.mock.calls.length).toBe(0);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should show tooltip when hover", async () => {
    const mockClick = jest.fn();
    const button: IButtonMenu = {
      kind: "button",
      name: "test-name",
      icon: <div>test-icon-el</div>,
      useClick: () => mockClick,
    };

    const { user } = renderWithSetup(menuGenerator(button, 0));

    expect(screen.queryByText("test-name")).not.toBeInTheDocument();

    await user.hover(screen.getByTestId("main"));

    expect(screen.getByText("test-name")).toBeInTheDocument();
  });

  test("can click", async () => {
    const mockClick = jest.fn();
    const button: IButtonMenu = {
      kind: "button",
      icon: <div>test-icon-el</div>,
      useClick: () => mockClick,
    };

    const { user } = renderWithSetup(menuGenerator(button, 0));
    await user.click(screen.getByTestId("main"));

    expect(mockClick.mock.calls.length).toBe(1);
  });
});

describe("nav menu", () => {
  test("should show tooltip when hover", async () => {
    const nav: INavMenu = {
      kind: "nav",
      name: "test-name",
      icons: [<div key="default">test-icon-el</div>],
      to: "test-url",
    };

    const { user } = renderWithSetup(menuGenerator(nav, 0));

    expect(screen.queryByText("test-name")).not.toBeInTheDocument();

    await user.hover(screen.getByTestId("main"));

    expect(screen.getByText("test-name")).toBeInTheDocument();
  });

  describe("when menu is not active", () => {
    test("renders correctly", async () => {
      const nav: INavMenu = {
        kind: "nav",
        icons: [<div key="default">test-default-icon-el</div>],
        to: "/test-url",
      };

      const { asFragment } = renderWithSetup(menuGenerator(nav, 0));

      expect(screen.getByTestId("main")).not.toHaveClass("active");
      expect(screen.getByTestId("main")).not.toHaveClass("sidebar_hidden_indicator");
      expect(screen.getByText("test-default-icon-el")).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });

    test("can click", async () => {
      const nav: INavMenu = {
        kind: "nav",
        icons: [<div key="default">test-default-icon-el</div>],
        to: "/test-url",
      };

      const { user } = renderWithSetup(menuGenerator(nav, 0));

      await user.click(screen.getByTestId("main"));

      expect(mockNavigate.mock.calls.length).toBe(1);
      expect(mockNavigate.mock.calls[0][0]).toBe("/test-url");
    });
  });

  describe("when menu is active", () => {
    test("renders correctly with default icon", async () => {
      const nav: INavMenu = {
        kind: "nav",
        icons: [<div key="default">test-default-icon-el</div>],
        to: "/test-url",
      };

      const { asFragment } = renderWithSetup(menuGenerator(nav, 0), { route: "/test-url" });

      expect(screen.getByTestId("main")).toHaveClass("active");
      expect(screen.getByTestId("main")).not.toHaveClass("sidebar_hidden_indicator");
      expect(screen.getByText("test-default-icon-el")).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });

    test("renders correctly with active icon", async () => {
      const nav: INavMenu = {
        kind: "nav",
        icons: [
          <div key="default">test-default-icon-el</div>,
          <div key="active">test-active-icon-el</div>,
        ],
        to: "/test-url",
      };

      const { asFragment } = renderWithSetup(menuGenerator(nav, 0), { route: "/test-url" });

      expect(screen.getByTestId("main")).toHaveClass("active");
      expect(screen.getByTestId("main")).not.toHaveClass("sidebar_hidden_indicator");
      expect(screen.getByText("test-active-icon-el")).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });

    test("can not click", async () => {
      const nav: INavMenu = {
        kind: "nav",
        icons: [<div key="default">test-default-icon-el</div>],
        to: "/test-url",
      };

      const { user } = renderWithSetup(menuGenerator(nav, 0), { route: "/test-url" });

      await user.click(screen.getByTestId("main"));

      expect(mockNavigate.mock.calls.length).toBe(0);
    });

    it("matches by pattern", async () => {
      const nav: INavMenu = {
        kind: "nav",
        icons: [<div key="default">test-default-icon-el</div>],
        to: "/test-url",
        pattern: "/test-pattern",
      };

      const { asFragment } = renderWithSetup(menuGenerator(nav, 0), { route: "/test-pattern" });

      expect(screen.getByTestId("main")).toHaveClass("active");
      expect(screen.getByTestId("main")).not.toHaveClass("sidebar_hidden_indicator");
      expect(screen.getByText("test-default-icon-el")).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });

    test("the sidebar can be switched", async () => {
      const nav: INavMenu = {
        kind: "nav",
        icons: [<div key="default">test-default-icon-el</div>],
        to: "/test-url",
        component: <div>test-sidebar-com</div>,
      };

      const { user } = renderWithSetup(menuGenerator(nav, 0), { route: "/test-url" });
      const mainDom = screen.getByTestId("main");

      expect(mainDom).not.toHaveClass("sidebar_hidden_indicator");

      await user.click(mainDom);

      expect(mainDom).toHaveClass("sidebar_hidden_indicator");
    });
  });
});
