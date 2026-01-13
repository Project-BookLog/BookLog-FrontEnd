import { OnboardingProvider, useOnboarding } from "../../context/OnboardingContext";
import Step0 from "./steps/Step_0_Page";
import Step1 from "./steps/Step_1_Page";
import Step2 from "./steps/Step_2_Page";
import Step3 from "./steps/Step_3_Page";
import CompletePage from "./steps/CompletePage";
import { Navigate } from "react-router-dom";

function StepRenderer() {
  const { step } = useOnboarding();

  switch (step) {
    case -1:
      return <Navigate to="/" replace />;
    case 0:
      return <Step0 />;
    case 1:
      return <Step1 />;
    case 2:
      return <Step2 />;
    case 3:
        return <Step3 />;
    default:
      return <CompletePage />;
  }
}

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <StepRenderer />
    </OnboardingProvider>
  );
}
