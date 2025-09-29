import React, { useState } from "react";
import styles from "./Register.module.css";
import StepPhoneEmail from "../RegistrationSteps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../RegistrationSteps/StepOtp/StepOtp";
import StepName from "../RegistrationSteps/StepName/StepName";
import StepAvatar from "../RegistrationSteps/StepAvatar/StepAvatar";
import StepUsername from "../RegistrationSteps/StepUsername/StepUsername";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
  3: StepName,
  4: StepAvatar,
  5: StepUsername,
};

const Register = () => {
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

export default Register;
