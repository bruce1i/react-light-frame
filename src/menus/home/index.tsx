import { IoHome } from "react-icons/io5";

import type { INavMenu } from "@/types/menu";

const home: INavMenu = {
  kind: "nav",
  icon: <IoHome />,
  name: "home",
  to: "/demo",
};

export default home;
