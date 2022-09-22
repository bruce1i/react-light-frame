import type { IIconMenu } from "@/types";

import logoPNG from "@/assets/logo.png";

const logo: IIconMenu = {
  kind: "icon",
  name: "React Light Frame",
  icon: <img src={logoPNG} alt="logo" />,
};

export default logo;
