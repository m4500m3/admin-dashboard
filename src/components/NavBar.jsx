import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LuUserPlus } from "react-icons/lu";
import { IoLogInOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import styles from "./NavBar.module.css";

function NavBar() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Clear the token
    console.log("logout");
    sessionStorage.removeItem("username"); // Clear the stored username
    navigate("/login");
  };

  return (
    <>
      <ul className={styles.navList}>
        <li>
          <NavLink to="/products">محصولات</NavLink>
        </li>
      </ul>
      <h1 className={styles.title}>بوت کمپ بوتواستارت</h1>
      <div className={styles.user}>
        {token ? (
          <button onClick={handleLogout} className={styles.logout}>
            <IoLogOutOutline />
          </button>
        ) : (
          <>
            <NavLink to="/signup">
              <LuUserPlus />
            </NavLink>
            <NavLink to="/login">
              <IoLogInOutline />
            </NavLink>
          </>
        )}
      </div>
    </>
  );
}

export default NavBar;
