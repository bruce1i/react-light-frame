import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "jotai";

type ProviderProps = {
  children: JSX.Element;
  route?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialAtoms?: Iterable<[any, any]>;
};

function AllTheProviders(props: ProviderProps) {
  const { route = "/", initialAtoms = [], children } = props;

  history.pushState({}, "", route);
  const router = createBrowserRouter([{ path: "*", element: children }]);

  return (
    <Provider initialValues={initialAtoms}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export function renderSetup(
  ui: JSX.Element,
  options: Omit<RenderOptions, "wrapper"> & Omit<ProviderProps, "children"> = {},
) {
  const { route, initialAtoms } = options;

  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: (props) => <AllTheProviders {...props} route={route} initialAtoms={initialAtoms} />,
      ...options,
    }),
  };
}
