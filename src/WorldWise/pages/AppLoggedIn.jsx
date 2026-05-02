import { Outlet } from "react-router";
import Sidebar from "../components/SideBar/Sidebar";
import Map from "../components/Map/Map";
import styles from "./AppLoggedIn.module.css";

function AppLoggedIn() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLoggedIn;
