import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  selectCities,
  selectCitiesLoading,
} from "../../features/worldWise/cityListSlice";
import { format } from "date-fns";
import { Flag } from "../components/Flag";
import Spinner from "../components/Spinner";

function CityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const cities = useSelector(selectCities);
  const isLoading = useSelector(selectCitiesLoading);
  const selectedCity = cities.find((city) => city.id.toString() === id);

  if (isLoading) return <Spinner />;

  if (!selectedCity) {
    return (
      <div style={{ textAlign: "center", marginTop: "10rem" }}>
        <h3>City not found</h3>
        <button onClick={() => navigate("/app/cities")}>Back to cities</button>
      </div>
    );
  }

  const formattedDate = selectedCity?.date
    ? format(new Date(selectedCity.date), "eeee, MMMM dd, yyyy")
    : "Date unknown";

  return (
    <div
      className="city-details"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: "100%",
        width: "100%",
      }}
    >
      <div className="header">
        <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#aaa" }}>
          CITY NAME
        </p>

        <span>
          <Flag value={selectedCity.emoji} />
          <h3 style={{ padding: "0 2rem", display: "inline" }}>
            {selectedCity.cityName || selectedCity.city_name}
          </h3>
        </span>
      </div>
      <div className="went-to">
        <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#aaa" }}>
          {`YOU WENT TO ${(selectedCity.city_name || selectedCity.cityName || "THIS CITY").toUpperCase()} ON`}
        </p>
        <p style={{ fontSize: "1.5rem" }}>{formattedDate}</p>
      </div>

      <div className="notes">
        <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#aaa" }}>
          YOUR NOTES
        </p>
        <p style={{ fontSize: "1.5rem" }}>{selectedCity?.notes}</p>
      </div>

      <div className="learn-more">
        <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#aaa" }}>
          LEARN MORE
        </p>
        <a
          style={{ color: "#ffb545", fontSize: "1.5rem" }}
          href={`https://en.wikipedia.org/wiki/${selectedCity?.cityName}`}
        >{`Check out ${selectedCity?.cityName} on Wikipedia →`}</a>
      </div>
      <button
        style={{
          display: "block",
          border: "1px solid #FFF",
          background: "none",
          color: "#FFF",
          padding: "1rem",
          borderRadius: "0.75rem",
          cursor: "pointer",
        }}
        onClick={() => navigate("/app/cities")}
      >
        ← Back
      </button>
    </div>
  );
}

export default CityDetails;
