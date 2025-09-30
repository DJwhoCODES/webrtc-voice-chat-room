import React, { useState } from "react";
import styles from "./Authenticate.module.css";
import StepPhoneEmail from "../RegistrationSteps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../RegistrationSteps/StepOtp/StepOtp";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }

  function onPrev() {
    setStep(step - 1);
  }

  return (
    <div>
      <Step onNext={onNext} onPrev={onPrev} />
    </div>
  );
};

export default Authenticate;
