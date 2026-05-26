import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export function Layout() {
  return (
    <div className={styles.shell}>
      <nav className={styles.sidebar}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="/devices"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Devices
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Users
        </NavLink>
      </nav>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
