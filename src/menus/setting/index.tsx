import { IoSettingsSharp } from "react-icons/io5";

import type { INavMenu } from "@/types/menu";

const setting: INavMenu = {
  kind: "nav",
  icon: <IoSettingsSharp />,
  name: "setting",
  to: "/demo/setting",
};

export default setting;
