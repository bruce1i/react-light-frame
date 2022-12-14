import type { EmptyFunc, EmptyFuncReturn } from "./func";

export interface IIconMenu {
  kind: "icon";
  icon: JSX.Element;
  name?: string;
}

export interface IButtonMenu {
  kind: "button";
  icon: JSX.Element;
  name?: string;
  useClick: EmptyFuncReturn<EmptyFunc>;
}

export interface INavMenu {
  kind: "nav";
  icons: [JSX.Element, JSX.Element?];
  name?: string;
  to: string;
  pattern?: string;
  component?: JSX.Element;
}

export type TMenu = IIconMenu | IButtonMenu | INavMenu;
