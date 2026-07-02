import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Sidebar from "../components/SideBar/Sidebar";
import Map from "../components/Map/Map";
import styles from "./AppLoggedIn.module.css";

function AppLoggedIn() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname, search } = useLocation();

  function toggleSidebar() {
    setIsSidebarOpen((open) => !open);
  }

  // Auto-open sidebar on mobile when navigating to the form (or updating search params on map click)
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile && pathname.includes("/form")) {
      setIsSidebarOpen(true);
    }
  }, [pathname, search]);

  return (
    <div className={styles.app}>
      <Sidebar isOpen={isSidebarOpen} />
      <Map isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
    </div>
  );
}

export default AppLoggedIn;
