import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../services/mutations";
import logo from "../assets/icons/Union.svg";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { mutate } = useLogin();

  const changeHandler = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
    setErrorMessage(""); // Clear error on input change
  };

  const loginHandler = (event) => {
    event.preventDefault();

    const { username, password } = form;

    if (!username || !password)
      return setErrorMessage("همه فیلدها ضروری هستند!");

    mutate(form, {
      onSuccess: (data) => {
        console.log(`${username} logged in`);
        sessionStorage.setItem("username", username);
        navigate("/products");
      },
      onError: (error) => console.log(error.response.data.message),
    });
  };
  return (
    <div className={styles.formWrapper}>
      <form onSubmit={loginHandler}>
        <img src={logo} alt="close" width="80" height="85" />
        <h1>فرم ورود</h1>
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
        </ul>
        <button type="submit">ورود</button>
        {errorMessage && <p className={styles.formError}>{errorMessage}</p>}
        <Link to="/signup">ایجاد حساب کاربری؟</Link>
      </form>
    </div>
  );
}

export default LoginPage;
