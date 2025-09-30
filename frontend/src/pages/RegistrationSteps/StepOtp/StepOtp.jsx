import React, { useState } from "react";
import styles from "./StepOtp.module.css";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import TextInput from "../../../components/shared/TextInput/TextInput";

const StepOtp = ({ onNext, onPrev }) => {
  const [otp, setOtp] = useState("");
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon="lock">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className={styles.actionButtonWrap}>
            <Button onClick={onPrev} btnText="Prev" logo="left-arrow" />
            <Button onClick={onNext} btnText="Next" />
          </div>
          <p className={styles.bottomParagraph}>
            OTP is valid for only 5 minutes.
          </p>
        </Card>
      </div>
      {/* <div>StepOtp</div>
      <button onClick={onPrev}>Prev</button>
      <button onClick={onNext}>Next</button> */}
    </>
  );
};

export default StepOtp;
