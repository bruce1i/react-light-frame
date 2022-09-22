import { IoSettingsOutline, IoSettings } from "react-icons/io5";

import type { INavMenu } from "@/types";

const setting: INavMenu = {
  kind: "nav",
  icons: [<IoSettingsOutline key="default" />, <IoSettings key="active" />],
  name: "setting",
  to: "/demo/setting",
};

export default setting;
