import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAtom } from "jotai";
import cx from "classnames";

import { showMenuSidebarAtom, themeModeDarkAtom } from "@/state";
import logoMenu from "@/menus/logo";
import logoutMenu from "@/menus/logout";
import settingMenu from "@/menus/setting";
import homeMenu from "@/menus/home";
import puzzleMenu from "@/menus/puzzle";
import dark from "@/menus/dark";
import type { TMenu } from "@/types/menu";
import { objectElseEmpty as oee } from "@/utils";

import { menuGenerator, useMenuSidebar } from "./utils/menuGenerator";
import * as styles from "./index.module.scss";

function Layout() {
  const [themeModeDark] = useAtom(themeModeDarkAtom);
  const [showMenuSidebar] = useAtom(showMenuSidebarAtom);
  const topMenus: TMenu[] = [logoMenu, homeMenu, puzzleMenu];
  const bottomMenus: TMenu[] = [dark, settingMenu, logoutMenu];
  const menuSidebar = useMenuSidebar([...topMenus, ...bottomMenus]);

  const renderMenus = (menus: TMenu[]) => {
    return menus.map((menu, idx) => menuGenerator(menu, idx));
  };

  return (
    <div className={styles.main}>
      <Helmet>
        <title>Demo</title>
        <body {...oee("theme-mode-dark", themeModeDark)} />
      </Helmet>

      <div className={styles.menu}>
        <section>{renderMenus(topMenus)}</section>
        <section>{renderMenus(bottomMenus)}</section>
      </div>
      {menuSidebar && (
        <div className={cx(styles.sidebar, { [styles.hide]: !showMenuSidebar })}>{menuSidebar}</div>
      )}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
