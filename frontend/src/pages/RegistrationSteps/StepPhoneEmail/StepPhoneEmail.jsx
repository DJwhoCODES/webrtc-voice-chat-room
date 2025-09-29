import React from "react";
import styles from "./StepPhoneEmail.module.css";
import { useNavigate } from "react-router-dom";

const StepPhoneEmail = ({ onNext }) => {
  return (
    <>
      <div>Phone or EMail</div>
      <button onClick={onNext}>Next</button>
    </>
  );
};

export default StepPhoneEmail;
