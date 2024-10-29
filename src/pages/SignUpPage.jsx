// RegistrationPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../services/mutations";
import logo from "../assets/icons/Union.svg";
import styles from "./LoginPage.module.css";

function RegistrationPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { mutate } = useRegister();

  const changeHandler = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
    setErrorMessage(""); // Clear error on input change
  };

  const registerHandler = (event) => {
    event.preventDefault();
    const { username, password, confirmPassword } = form;

    // Check that all fields are filled
    if (!username || !password || !confirmPassword) {
      return setErrorMessage("همه فیلدها ضروری هستند!");
    }

    // Ensure passwords match
    if (password !== confirmPassword) {
      return setErrorMessage("پسورد و تکرار آن یکی نیست!");
    }

    // Enforce password strength: at least 8 characters with letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return setErrorMessage("پسورد باید 8 کاراکتر شامل حرف و رقم باشد!");
    }

    // If all checks pass, proceed with registration
    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          console.log(data.data.message);
          navigate("/login");
        },
        onError: (error) => {
          if (error.response?.data?.message.includes("User already exists")) {
            setErrorMessage("این نام کاربری وجود دارد.");
          } else {
            setErrorMessage("!ثبت نام با خطا مواجه شده است. دوباره تلاش کن");
          }
        },
      }
    );
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={registerHandler} className={styles.signupForm}>
        <img src={logo} alt="close" width="80" height="85" />
        <h1>فرم ثبت نام</h1>
        <ul>
          <li>
            <input
              type="text"
              name="username"
              placeholder="نام کاربری"
              value={form.username}
              onChange={changeHandler}
            />
          </li>
          <li>
            <input
              type="password"
              name="password"
              placeholder="رمز عبور"
              value={form.password}
              onChange={changeHandler}
            />
          </li>
          <li>
            <input
              type="password"
              name="confirmPassword"
              placeholder="تکرار رمز عبور"
              value={form.confirmPassword}
              onChange={changeHandler}
            />
          </li>
        </ul>
        <button type="submit">ثبت نام</button>

        {errorMessage && <p className={styles.formError}>{errorMessage}</p>}

        <Link to="/login">حساب کاربری دارید؟</Link>
      </form>
    </div>
  );
}

export default RegistrationPage;
