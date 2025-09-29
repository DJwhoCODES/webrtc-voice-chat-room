import React, { useState } from "react";
import styles from "./Login.module.css";
import StepPhoneEmail from "../RegistrationSteps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../RegistrationSteps/StepOtp/StepOtp";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const Login = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }

  return (
    <div>
      <Step onNext={onNext} />
    </div>
  );
};

export default Login;
