import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectAuthError,
  selectAuthLoading,
} from "../../features/cityExplorer/authSlice";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
// ... existing code
import styles from "./Login.module.css";
import { supabase } from "../lib/supabaseClient";

function LoginForm({ defaultEmail, defaultPassword, onSubmit }) {
  const { register, handleSubmit } = useForm();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.row}>
        <p className={styles.label}>Email address</p>
        <input
          className={styles.input}
          defaultValue={defaultEmail}
          {...register("email")}
        />
      </div>

      <div className={styles.row}>
        <p className={styles.label}>Password</p>
        <input
          className={styles.input}
          type="password"
          defaultValue={defaultPassword}
          {...register("password")}
        />
      </div>

      <div>
        <button className={styles.button}>Login with this User</button>
      </div>
    </form>
  );
}

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  if (authLoading) return <Spinner />;

  return (
    <main className={styles.login}>
      {authError && <h4 className={styles.error}>{authError}</h4>}
      <div className={styles.container}>
        <LoginForm
          defaultEmail="explorer@example.com"
          defaultPassword="explorer123"
          onSubmit={onSubmit}
        />
        <LoginForm
          defaultEmail="mss@example.com"
          defaultPassword="mss"
          onSubmit={onSubmit}
        />
      </div>
    </main>
  );
}

export default Login;
