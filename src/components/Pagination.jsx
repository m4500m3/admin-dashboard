import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ page, totalPages, onNext, onPrevious }) => {
  return (
    <div className={styles.pagination}>
      <button onClick={onPrevious} disabled={page === 1}>
        «
      </button>
      <span>{page}</span>
      <button onClick={onNext} disabled={page === totalPages}>
        »
      </button>
    </div>
  );
};

export default Pagination;
