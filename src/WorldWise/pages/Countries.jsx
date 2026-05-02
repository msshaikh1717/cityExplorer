import { useSelector } from "react-redux";
import { selectCities } from "../../features/worldWise/cityListSlice";
import CountryItem from "./CountryItem";
import styles from "./Countries.module.css";

function Countries() {
  const cities = useSelector(selectCities);

  const uniqueCountries = [...new Set(cities.map((city) => city.country))].map(
    (countryName) => {
      const firstCity = cities.find((city) => city.country === countryName);
      return { country: countryName, emoji: firstCity.emoji };
    },
  );

  return (
    <ul className={styles.countriesList}>
      {uniqueCountries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default Countries;
