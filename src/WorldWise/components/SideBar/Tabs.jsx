import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setMapError } from "../../../features/worldWise/currPositionSlice";
import styles from "./Tabs.module.css";

function Tabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <ul className={styles.tabs}>
      <li>
        <button
          className={`${styles.tab} ${
            location.pathname.startsWith("/app/cities") ? styles.active : ""
          }`}
          onClick={() => {
            dispatch(setMapError(null));
            navigate("cities");
          }}
        >
          Cities
        </button>
      </li>
      <li>
        <button
          className={`${styles.tab} ${
            location.pathname === "/app/countries" ? styles.active : ""
          }`}
          onClick={() => {
            dispatch(setMapError(null));
            navigate("countries");
          }}
        >
          Countries
        </button>
      </li>
    </ul>
  );
}

export default Tabs;
