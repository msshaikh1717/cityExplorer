import { Link, NavLink } from "react-router";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logoContainer}>
        <img src="/icon.png" className={styles.logo} alt="WorldWise Logo" />
        <h1 className={styles.title}>CityExplorer</h1>
      </NavLink>

      <nav className={styles.nav}>
        <NavLink to="/product" className={styles.navLink}>
          Product
        </NavLink>
        <NavLink to="/pricing" className={styles.navLink}>
          Pricing
        </NavLink>
        <Link to="/login" className={`${styles.navLink} ${styles.loginLink}`}>
          Login
        </Link>
      </nav>
    </header>
  );
}

export default Header;
