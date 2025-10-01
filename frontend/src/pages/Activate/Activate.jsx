import React, { useState } from "react";
import StepName from "../RegistrationSteps/StepName/StepName";
import StepAvatar from "../RegistrationSteps/StepAvatar/StepAvatar";

const steps = {
  1: StepName,
  2: StepAvatar,
};

const Activate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }
  return (
    <div className="cardWrapper">
      <Step onNext={onNext}></Step>
    </div>
  );
};

export default Activate;
