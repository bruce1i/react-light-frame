import { IoHomeOutline, IoHome } from "react-icons/io5";

import type { INavMenu } from "@/types/menu";

const home: INavMenu = {
  kind: "nav",
  icons: [<IoHomeOutline key="default" />, <IoHome key="active" />],
  name: "home",
  to: "/demo",
};

export default home;
