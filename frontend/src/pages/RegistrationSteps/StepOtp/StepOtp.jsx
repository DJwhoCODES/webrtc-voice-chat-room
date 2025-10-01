import React, { useState } from "react";
import styles from "./StepOtp.module.css";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import TextInput from "../../../components/shared/TextInput/TextInput";
import { verifyOtp } from "../../../http";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";

const StepOtp = ({ onNext, onPrev }) => {
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();

  const { phone, hash } = useSelector((state) => state.auth.otp);

  async function submit() {
    try {
      const res = await verifyOtp({ otp, phone, hash });
      console.log(res.data);
      dispatch(setAuth(res.data));
      // onNext();
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon="lock">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className={styles.actionButtonWrap}>
            <Button onClick={onPrev} btnText="Prev" logo="left-arrow" />
            <Button onClick={submit} btnText="Next" />
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
