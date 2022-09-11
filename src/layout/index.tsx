import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

import * as styles from "./index.module.scss";

function Layout() {
  return (
    <div className={styles.main}>
      <Helmet>
        <title>Demo</title>
      </Helmet>

      <header className={styles.header}>H</header>
      <aside className={styles.sidebar}>A</aside>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
