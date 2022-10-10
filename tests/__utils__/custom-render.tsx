import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "jotai";

type Options = {
  route?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialAtoms?: Iterable<[any, any]>;
};

export const renderWithSetup = (ui: JSX.Element, options: Options = {}) => {
  const { route = "/", initialAtoms = [] } = options;

  history.pushState({}, "", route);
  const router = createBrowserRouter([{ path: "*", element: ui }]);

  return {
    user: userEvent.setup(),
    ...render(
      <Provider initialValues={initialAtoms}>
        <RouterProvider router={router} />
      </Provider>,
    ),
  };
};
