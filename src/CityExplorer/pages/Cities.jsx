import { Outlet, useSearchParams } from "react-router";
import styles from "./Cities.module.css";

function Cities() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");

  return (
    <ul className={`${styles.cities} ${lat ? styles.fullHeight : ""}`}>
      <Outlet />
    </ul>
  );
}

export default Cities;
