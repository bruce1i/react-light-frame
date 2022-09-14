import { IoExtensionPuzzle } from "react-icons/io5";

import type { INavMenu } from "@/types/menu";

function Sidebar() {
  return <div>Sidebar</div>;
}

const puzzle: INavMenu = {
  kind: "nav",
  icon: <IoExtensionPuzzle />,
  name: "puzzle",
  to: "/demo/puzzle",
  component: <Sidebar />,
};

export default puzzle;
