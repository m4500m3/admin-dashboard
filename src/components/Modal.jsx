import React, { useRef, useEffect } from "react";
import closeIcon from "../assets/icons/Close.svg";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, message, onConfirm, onCancel }) => {
  const modalRef = useRef(null);

  // Close modal if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel(); // Close modal
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal} ref={modalRef}>
        <img src={closeIcon} alt="close" width="96" height="98" />
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.deleteBtn} onClick={onConfirm}>
            حذف
          </button>
          <button className={styles.canceleBtn} onClick={onCancel}>
            لغو
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
