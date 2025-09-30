import React, { useState } from "react";
import styles from "./StepPhoneEmail.module.css";
import { useNavigate } from "react-router-dom";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onNext, onPrev }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];

  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrapper}>
            <button className={styles.tabBtn} onClick={() => setType("phone")}>
              {<img src="/images/phone.png" alt="phone" />}
            </button>
            <button className={styles.tabBtn} onClick={() => setType("email")}>
              {<img src="/images/mail.png" alt="mail" />}
            </button>
          </div>
          <Component onNext={onNext} onPrev={onPrev} />
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
