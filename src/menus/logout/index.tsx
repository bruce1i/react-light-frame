import { IoLogOutOutline } from "react-icons/io5";

import type { IButtonMenu } from "@/types";

const logout: IButtonMenu = {
  kind: "button",
  name: "logout",
  icon: <IoLogOutOutline />,
  useClick: () => () => {
    alert("logout");
  },
};

export default logout;
