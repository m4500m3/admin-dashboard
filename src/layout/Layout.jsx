import NavBar from "../components/NavBar";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <NavBar />
        {/* <button onClick={handleLogout}>Logout</button> */}
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>Developed by Masi ❤️</footer>
    </>
  );
}

export default Layout;
