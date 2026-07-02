import { useNavigate } from "react-router";
import styles from "./Homepage.module.css";

function Homepage() {
  const navigate = useNavigate();

  return (
    <main className={styles.homepage}>
      <h1 className={styles.headingPrimary}>
        You travel the world.
        <br />
        CityExplorer keeps track of your adventures.
      </h1>
      <h2 className={styles.headingSecondary}>
        A world map that tracks your footsteps into every city you can think of.
        Never forget your wonderful experiences, and show your friends how you
        have wandered the world.
      </h2>
      <button className={styles.ctaBtn} onClick={() => navigate("/login")}>
        START TRACKING NOW
      </button>
    </main>
  );
}

export default Homepage;
