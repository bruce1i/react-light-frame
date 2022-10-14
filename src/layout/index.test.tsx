import { renderSetup } from "rlf-test-utils";

import Layout from "./index";

test("renders correctly", () => {
  const { asFragment } = renderSetup(<Layout />);

  expect(asFragment()).toMatchSnapshot();
});
