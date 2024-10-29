import styles from "./UserInfo.module.css";
import { AiOutlineUser } from "react-icons/ai";

function UserInfo() {
  const username = sessionStorage.getItem("username");
  return (
    <div className={styles.userInfo}>
      <div className={styles.userProfile}>
        <AiOutlineUser />
      </div>{" "}
      <p>
        <span>{username}</span>
        <span className={styles.userRole}>مدیر</span>
      </p>
    </div>
  );
}

export default UserInfo;
