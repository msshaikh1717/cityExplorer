import { useState } from "react";
import Sidebar from "../components/SideBar/Sidebar";
import Map from "../components/Map/Map";
import styles from "./AppLoggedIn.module.css";

function AppLoggedIn() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen((open) => !open);
  }

  return (
    <div className={styles.app}>
      <Sidebar isOpen={isSidebarOpen} />
      <Map isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
    </div>
  );
}

export default AppLoggedIn;
