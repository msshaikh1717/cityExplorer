import { Outlet, useLocation } from "react-router";
import Header from "../components/Header";
import styles from "./AppLayout.module.css";

const PAGE_CONFIGS = {
  "/": {
    background: "url('bg.jpg')",
    brightness: "brightness(0.3)",
  },
  "/product": { background: "var(--color-dark--0)", brightness: "brightness(1)" },
  "/pricing": { background: "var(--color-dark--0)", brightness: "brightness(1)" },
  "/login": { background: "var(--color-dark--0)", brightness: "brightness(1)" },
  default: { background: "var(--color-dark--0)", brightness: "brightness(1)" },
};

function AppLayout() {
  const location = useLocation();
  const config = PAGE_CONFIGS[location.pathname] || PAGE_CONFIGS.default;

  return (
    <div className={styles.appLayout}>
      <div
        className={styles.background}
        style={{
          background: config.background,
          filter: config.brightness,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
