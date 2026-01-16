import { createContext, useContext, useState } from "react";

type AnswerMap = {
  [step: number]: string[];
};

interface OnboardingContextType {
  step: number;
  answers: AnswerMap;
  nextStep: () => void;
  prevStep: () => void;
  toggleAnswer: (step: number, value: string, max?: number) => void;
  skipStep: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const toggleAnswer = (step: number, value: string, max?: number) => {
    setAnswers((prev) => {
      const prevValues = prev[step] ?? [];

      if (prevValues.includes(value)) {
        return {
          ...prev,
          [step]: prevValues.filter((v) => v !== value),
        };
      }

      if (max && prevValues.length >= max) {
        return prev;
      }

      return {
        ...prev,
        [step]: [...prevValues, value],
      };
    });
  };
  
  const skipStep = () => {
    setAnswers((prev) => ({
      ...prev,
      [step]: [],
    }));
    nextStep();
  };

  return (
    <OnboardingContext.Provider
      value={{ step, answers, nextStep, prevStep, toggleAnswer, skipStep }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("OnboardingProvider로 감싸야 합니다.");
  }
  return context;
};
