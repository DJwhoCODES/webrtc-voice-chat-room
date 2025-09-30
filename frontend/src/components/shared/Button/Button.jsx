import React from "react";
import styles from "./Button.module.css";

const Button = ({ btnText, onClick, logo = "arrow" }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {logo == "arrow" ? (
        <>
          <span>{btnText}</span>
          <img
            className={styles.arrow}
            src={`/images/${logo}.png`}
            alt="arrow-next"
          />
        </>
      ) : (
        <>
          <img
            className={styles.left_arrow}
            src={`/images/${logo}.png`}
            alt="arrow-next"
          />
          <span>{btnText}</span>
        </>
      )}
    </button>
  );
};

export default Button;
