import { render, screen } from "@testing-library/react";

import type { IIconMenu } from "@/types/menu";

import { menuGenerator } from "./index";

test("generates an icon button", () => {
  const icon: IIconMenu = {
    kind: "icon",
    icon: <div>test-icon-el</div>,
  };

  render(menuGenerator(icon, 0));

  expect(screen.getByText("test-icon-el")).toBeInTheDocument();
});
