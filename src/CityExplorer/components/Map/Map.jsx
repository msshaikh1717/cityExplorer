import { useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap, useMapEvents } from "react-leaflet/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { useLocation } from "../../../hooks/useLocation";
import {
  selectPosition,
  setPosition,
} from "../../../features/cityExplorer/currPositionSlice";
import { selectCities } from "../../../features/cityExplorer/cityListSlice";
import { Flag } from "../Flag";
import {
  clearSession,
  selectUser,
} from "../../../features/cityExplorer/authSlice";
import { supabase } from "../../lib/supabaseClient";
import styles from "./Map.module.css";

// fly to clicked location on map
function LocationMarker({ dispatch, navigate }) {
  const map = useMapEvents({
    click(e) {
      const convertedPositionFormat = [e.latlng.lat, e.latlng.lng];
      dispatch(setPosition(convertedPositionFormat));
      map.flyTo(e.latlng, 4);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

// sync map with current position
function SyncMapLocation({ position, isSidebarOpen }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 4);
  }, [position, map]);

  // Fix Leaflet's grey tiles when sidebar toggles on mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 400); // Wait for transition (300ms) + buffer

    return () => clearTimeout(timer);
  }, [isSidebarOpen, map]);

  return null;
}

function Map({ isSidebarOpen, onToggleSidebar }) {
  const position = useSelector(selectPosition);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading: isLoadingUserPosition,
    error,
    getUserLocation,
  } = useLocation();
  const cities = useSelector(selectCities);
  const user = useSelector(selectUser);
  const displayName = user?.email?.split("@")[0] || "User";

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const lng = searchParams.get("lng");
    const lat = searchParams.get("lat");
    if (lat && lng) dispatch(setPosition([parseFloat(lat), parseFloat(lng)]));
  }, [searchParams, dispatch]);

  function handlePosition() {
    getUserLocation((newPosition) => {
      dispatch(setPosition(newPosition));
    });
  }

  return (
    <div className={styles.mapContainer}>
      {/* FAB Toggle for Mobile */}
      <button className={styles.fab} onClick={onToggleSidebar}>
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      <div className={styles.userStatus}>
        <img
          className={styles.avatar}
          alt="profPic"
          src={`https://i.pravatar.cc/100?u=${user?.id}`}
        />
        <p className={styles.userName}>Welcome, {displayName}</p>
        <button
          className={styles.logoutBtn}
          onClick={async () => {
            await supabase.auth.signOut();
            dispatch(clearSession());
            navigate("/");
          }}
        >
          LOGOUT
        </button>
      </div>

      <MapContainer
        center={position}
        zoom={4}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={city.position} key={city.id}>
            <Popup>
              <p
                style={{
                  minWidth: "15rem",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Flag value={city.emoji} />
                {city.cityName}
              </p>
            </Popup>
          </Marker>
        ))}
        <SyncMapLocation position={position} isSidebarOpen={isSidebarOpen} />
        <LocationMarker dispatch={dispatch} navigate={navigate} />
      </MapContainer>

      <button className={styles.userPosBtn} onClick={handlePosition}>
        {isLoadingUserPosition
          ? "Loading your position..."
          : "USE YOUR POSITION"}
      </button>
    </div>
  );
}

export default Map;
