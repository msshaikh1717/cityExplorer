import { Outlet, useSearchParams } from "react-router";
import Logo from "./Logo";
import Tabs from "./Tabs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCities,
  selectCities,
  selectCitiesError,
  selectCitiesLoading,
} from "../../../features/cityExplorer/cityListSlice";
import { selectMapError } from "../../../features/cityExplorer/currPositionSlice";
import { useEffect } from "react";
import Spinner from "../../../assets/Spinner";
import styles from "./Sidebar.module.css";

function Sidebar({ isOpen }) {
  const [searchParams] = useSearchParams();
  const cities = useSelector(selectCities);
  const cityLoading = useSelector(selectCitiesLoading);
  const cityError = useSelector(selectCitiesError);
  const mapError = useSelector(selectMapError);
  const lat = searchParams.get("lat");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
      <div className={styles.logoTab}>
        <Logo />
        <Tabs />
      </div>
      <div className={styles.content}>
        {mapError && <h3 className={styles.error}>{mapError}</h3>}

        {cityError && <h3 className={styles.fetchError}>{cityError}</h3>}

        {cityLoading && <Spinner />}

        {!mapError && !cityError && lat && !cityLoading && <Outlet />}

        {!mapError &&
          !cityError &&
          !cityLoading &&
          !lat &&
          cities.length === 0 && (
            <h3 className={styles.empty}>
              👋 Add your first city by clicking on a city on the map
            </h3>
          )}

        {!mapError &&
          !cityError &&
          !lat &&
          cities.length > 0 &&
          !cityLoading && <Outlet />}
      </div>

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by CityExplorer Inc.
        </p>
      </footer>
    </aside>
  );
}

export default Sidebar;
