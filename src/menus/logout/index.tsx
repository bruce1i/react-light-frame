import { IoLogOut } from "react-icons/io5";
// import { GiExitDoor } from "react-icons/gi";

import type { IButtonMenu } from "@/types/menu";

const logout: IButtonMenu = {
  kind: "button",
  name: "logout",
  icon: <IoLogOut />,
  //   icon: <GiExitDoor />,
  onClick: () => {
    alert("logout");
  },
};

export default logout;
