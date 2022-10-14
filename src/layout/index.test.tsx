import { renderSetup } from "rlf-test-utils";

import Layout from "./index";

test("renders correctly", () => {
  const { asFragment } = renderSetup(<Layout />);

  expect(asFragment()).toMatchSnapshot();
});

test("renders correctly with sidebar", () => {
  const { asFragment } = renderSetup(<Layout />, { path: "/demo/puzzle" });

  expect(asFragment()).toMatchSnapshot();
});
