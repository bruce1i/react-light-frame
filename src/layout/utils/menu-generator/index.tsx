import { useMatch, useNavigate, useLocation, matchPath } from "react-router-dom";
import { useAtom } from "jotai";
import Tippy from "@tippyjs/react";
import cx from "classnames";

import type { TMenu, IIconMenu, IButtonMenu, INavMenu } from "@/types";
import { showMenuSidebarAtom } from "@/state";

import * as styles from "./index.module.scss";

function useIsActive(pattern: string) {
  return useMatch(pattern) !== null;
}

function checkActive(pattern, pathname) {
  return matchPath(pattern, pathname) !== null;
}

function IconMenu({ icon, name = "" }: IIconMenu) {
  return (
    <Tippy content={name} placement="right" disabled={name === ""}>
      <div data-testid="main" className={cx(styles.main, styles.disable_hover)}>
        {icon}
      </div>
    </Tippy>
  );
}

function ButtonMenu({ icon, name = "", useClick }: IButtonMenu) {
  const click = useClick();

  return (
    <Tippy content={name} placement="right" disabled={name === ""}>
      <button data-testid="main" className={styles.main} onClick={click}>
        {icon}
      </button>
    </Tippy>
  );
}

function NavMenu({ icons, name = "", to, pattern, component }: INavMenu) {
  const [showMenuSidebar, setShowMenuSidebar] = useAtom(showMenuSidebarAtom);
  const [defaultIcon, activeIcon] = icons;
  const isActive = useIsActive(pattern ?? to);
  const navigate = useNavigate();
  const hasSidebar = component !== undefined;
  const sidebarHiddenIndicator = isActive && hasSidebar && !showMenuSidebar;

  const handleClick = () => {
    if (isActive) {
      if (hasSidebar) setShowMenuSidebar(!showMenuSidebar);
      return;
    }

    if (hasSidebar) setShowMenuSidebar(true);
    navigate(to);
  };

  return (
    <Tippy content={name} placement="right" disabled={name === ""}>
      <button
        data-testid="main"
        className={cx(styles.main, {
          [styles.active]: isActive,
          [styles.sidebar_hidden_indicator]: sidebarHiddenIndicator,
        })}
        onClick={handleClick}
      >
        {isActive ? activeIcon ?? defaultIcon : defaultIcon}
      </button>
    </Tippy>
  );
}

export function menuGenerator(menu: TMenu, idx: number) {
  switch (menu.kind) {
    case "icon":
      return <IconMenu key={idx} {...menu} />;
    case "button":
      return <ButtonMenu key={idx} {...menu} />;
    case "nav":
      return <NavMenu key={idx} {...menu} />;
  }
}

export function useMenuSidebar(menus: TMenu[]) {
  const { pathname } = useLocation();
  const activeMenu = menus
    .filter(({ kind }) => kind === "nav")
    .filter(({ to, pattern }: INavMenu) => checkActive(pattern ?? to, pathname))[0] as INavMenu;

  if (activeMenu) {
    return activeMenu.component;
  }

  return null;
}
