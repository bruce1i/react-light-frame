import { render, renderSetup, renderHookSetup, screen } from "rlf-test-utils";

import type { IIconMenu, IButtonMenu, INavMenu, TMenu } from "@/types/menu";

import { menuGenerator, useMenuSidebar } from "./index";

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

    const { user } = renderSetup(menuGenerator(icon, 0));

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

    const { user } = renderSetup(menuGenerator(button, 0));

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

    const { user } = renderSetup(menuGenerator(button, 0));
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

    const { user } = renderSetup(menuGenerator(nav, 0));

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

      const { asFragment } = renderSetup(menuGenerator(nav, 0));

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

      const { user } = renderSetup(menuGenerator(nav, 0));

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

      const { asFragment } = renderSetup(menuGenerator(nav, 0), { path: "/test-url" });

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

      const { asFragment } = renderSetup(menuGenerator(nav, 0), { path: "/test-url" });

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

      const { user } = renderSetup(menuGenerator(nav, 0), { path: "/test-url" });

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

      const { asFragment } = renderSetup(menuGenerator(nav, 0), { path: "/test-pattern" });

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

      const { user } = renderSetup(menuGenerator(nav, 0), { path: "/test-url" });
      const mainDom = screen.getByTestId("main");

      expect(mainDom).not.toHaveClass("sidebar_hidden_indicator");

      await user.click(mainDom);

      expect(mainDom).toHaveClass("sidebar_hidden_indicator");
    });
  });
});

describe("useMenuSidebar", () => {
  const initMenus: TMenu[] = [
    {
      kind: "icon",
      icon: <div>test-icon-el</div>,
    },
    {
      kind: "nav",
      icons: [<div key="default">test-default-icon-el</div>],
      to: "/test-url",
      component: <div>test-sidebar-com</div>,
    },
    {
      kind: "nav",
      icons: [<div key="default">test-default-icon-el</div>],
      to: "/test-no-component-url",
    },
  ];

  test("should return sidebar component if NavMenu is matched", () => {
    const { result } = renderHookSetup((menus) => useMenuSidebar(menus), {
      initialProps: initMenus,
      path: "/test-url",
    });

    expect(result.current).toEqual(<div>test-sidebar-com</div>);
  });

  test("should return undefined if NavMenu is matched without component", () => {
    const { result } = renderHookSetup((menus) => useMenuSidebar(menus), {
      initialProps: initMenus,
      path: "/test-no-component-url",
    });

    expect(result.current).toBeUndefined();
  });

  test("should return null if no NavMenu is matched ", () => {
    const { result } = renderHookSetup((menus) => useMenuSidebar(menus), {
      initialProps: initMenus,
    });

    expect(result.current).toBeNull();
  });
});
