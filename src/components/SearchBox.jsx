import React from "react";
import searchIcon from "../assets/icons/search-normal.svg";
import styles from "./searchBox.module.css";

const SearchBox = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className={styles.searchBox}>
      <img src={searchIcon} alt="close" width="24" height="24" />
      <input
        type="text"
        placeholder="جستجو کالا"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
