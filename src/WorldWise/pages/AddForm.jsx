import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useSearchParams } from "react-router";
import { getCity } from "../../hooks/useGetCity";
import { useDispatch, useSelector } from "react-redux";
import {
  selectClickedCityObj,
  setClickedCityObj,
  setMapError,
} from "../../features/worldWise/currPositionSlice";
import { createCity } from "../../features/worldWise/cityListSlice";
import { Flag } from "../components/Flag";
import { format } from "date-fns";
import styles from "./AddForm.module.css";

function AddForm() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const clickedCityObj = useSelector(selectClickedCityObj);
  const [isLoading, setIsLoading] = useState(false);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const cityToAdd = {
      city_name: data.cityName,
      country: clickedCityObj.countryName,
      emoji: clickedCityObj.countryCode,
      notes: data.notes,
      position: {
        lat,
        lng,
      },
      date: format(data.date, "yyyy-MM-dd"),
    };
    dispatch(createCity(cityToAdd));
    navigate("/app/cities");
  }

  useEffect(() => {
    async function fetchCityData() {
      if (!lat || !lng) return;
      setIsLoading(true);
      try {
        const newCityObj = await getCity(lat, lng);
        if (!newCityObj.city) {
          dispatch(
            setMapError(
              "👋 That doesn't seem to be a city. Click somewhere else 😉",
            ),
          );
        } else {
          dispatch(setClickedCityObj(newCityObj));
          setValue("cityName", newCityObj.city);
        }
      } catch (err) {
        dispatch(
          setMapError("Failed to ftch city: Check Internet Connection", err),
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchCityData();
  }, [searchParams, lat, lng, setValue, dispatch]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.row}>
        <label className={styles.label}>
          City Name
          <span style={{ padding: "0 2rem" }}>
            <Flag value={clickedCityObj?.countryCode} />
          </span>
        </label>
        <input
          className={styles.input}
          defaultValue={clickedCityObj.city}
          {...register("cityName")}
        />
      </div>

      <div className={styles.row}>
        <label className={styles.label}>
          When did you go to {clickedCityObj.city}?
        </label>
        <Controller
          name="date"
          control={control}
          defaultValue={new Date()}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              customInput={<input className={styles.input} />}
            />
          )}
        />
      </div>

      <div className={styles.row}>
        <label className={styles.label}>
          Notes about your trip to {clickedCityObj.city}
        </label>
        <textarea
          className={styles.input}
          style={{ height: "10rem", resize: "none" }}
          defaultValue=""
          {...register("notes", { required: true })}
        />
      </div>

      <div className={styles.buttons}>
        <button className={`${styles.btn} ${styles.btnAdd}`} disabled={isLoading}>
          {isLoading ? "Loading..." : "Add"}
        </button>

        <button
          type="button"
          className={`${styles.btn} ${styles.btnBack}`}
          onClick={() => navigate("/app/cities")}
        >
          Back
        </button>
      </div>
    </form>
  );
}

export default AddForm;
