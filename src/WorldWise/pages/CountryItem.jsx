import { Flag } from "../components/Flag";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <Flag value={country.emoji} />
      <p className={styles.countryName}>{country.country}</p>
    </li>
  );
}

export default CountryItem;
