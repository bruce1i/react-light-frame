import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export const renderWithRouter = (ui: JSX.Element, { route = "/" } = {}) => {
  history.pushState({}, "", route);
  const routes = [{ path: "*", element: ui }];

  return {
    user: userEvent.setup(),
    ...render(<RouterProvider router={createBrowserRouter(routes)} />),
  };
};

export const renderSetup = (ui: JSX.Element) => {
  return {
    user: userEvent.setup(),
    ...render(ui),
  };
};
