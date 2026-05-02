import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectAuthError,
  selectAuthLoading,
} from "../../features/worldWise/authSlice";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "./Login.module.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate("/app/cities");
    } catch (error) {
      console.error(error, "<== error");
    }
  };

  useEffect(() => {
    async function checkPrevLogin() {
      await supabase.auth.getSession();
    }
    checkPrevLogin();
  }, []);

  return (
    <main className={styles.login}>
      {authLoading ? (
        <Spinner />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {authError && <h4 className={styles.error}>{authError}</h4>}
          <div className={styles.row}>
            <p className={styles.label}>Email address</p>
            <input
              className={styles.input}
              defaultValue="udemy3@example.com"
              {...register("email")}
            />
          </div>

          <div className={styles.row}>
            <p className={styles.label}>Password</p>
            <input
              className={styles.input}
              type="password"
              defaultValue="udemy3"
              {...register("password")}
            />
          </div>

          <div>
            <button className={styles.button}>LOGIN</button>
          </div>
        </form>
      )}
    </main>
  );
}

export default Login;
