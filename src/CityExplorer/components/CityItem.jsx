import { format } from "date-fns";
import { useDispatch } from "react-redux";

import { Link } from "react-router";
import { Flag } from "./Flag";
import { removeCity } from "../../features/cityExplorer/cityListSlice";

import styles from "./CityItem.module.css";

function CityItem({ city }) {
  // should receive date in format "2027-10-31T15:59:59.138Z"
  const formattedDate = format(new Date(city.date), "MMM dd, yyyy");

  const dispatch = useDispatch();

  return (
    <Link
      to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        width: "100%",
        display: "block",
      }}
    >
      <li className={styles.cityItem}>
        <Flag value={city.emoji} />
        <span className={styles.cityName}>{city.city_name}</span>
        <time className={styles.date}>({formattedDate})</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            dispatch(removeCity(city.id));
          }}
        >
          &times;
        </button>
      </li>
    </Link>
  );
}

export default CityItem;
