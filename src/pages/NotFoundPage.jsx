import React from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../assets/404.png";
import { useAuth } from "../contexts/AuthContext";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  return (
    <div className={styles.notFoundContainer}>
      <div>
        <h1>اوه نه!</h1>
        <p>حالا چیکار کنیم؟</p>
        <button
          onClick={() => {
            token ? navigate("/") : navigate("/login");
          }}
        >
          بزن بریم
        </button>
      </div>
      <img src={notFound} alt="close" width="388" height="471" />
    </div>
  );
};

export default NotFoundPage;
