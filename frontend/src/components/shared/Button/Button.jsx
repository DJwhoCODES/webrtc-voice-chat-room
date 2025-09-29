import React from "react";
import styles from "./Button.module.css";

const Button = ({ btnText, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <span>{btnText}</span>
      <img className={styles.arrow} src="/images/arrow.png" alt="arrow-next" />
    </button>
  );
};

export default Button;
