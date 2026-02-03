import { createContext, useContext, useState } from "react";
import type { RequestOnboardingAnswers } from "../types/onboarding";

type AnswerMap = Partial<RequestOnboardingAnswers>;

interface OnboardingContextType {
  step: number;
  answers: Partial<RequestOnboardingAnswers>;
  toggleAnswer: <K extends readonly (keyof RequestOnboardingAnswers)[]>(keys: K, value: NonNullable<RequestOnboardingAnswers[K[number]]>, max?: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  skipStep: (keys: readonly (keyof RequestOnboardingAnswers)[]) => void;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const toggleAnswer = <K extends readonly (keyof RequestOnboardingAnswers)[]>(
    keys: K,
    value: NonNullable<RequestOnboardingAnswers[K[number]]>,
    max = keys.length
  ) => {
    setAnswers((prev) => {
      const selectedKeys = keys.filter((k) => prev[k] != null);
      const selectedCount = selectedKeys.length;

      const existingKey = keys.find((k) => prev[k] === value);
      if (existingKey) {
        return { ...prev, [existingKey]: undefined };
      }

      if (selectedCount >= max) {
        return prev;
      }

      const emptyKey = keys.find((k) => prev[k] == null);
      if (!emptyKey) return prev;

      return { ...prev, [emptyKey]: value };
    });
  };

  const skipStep = (keys: readonly (keyof RequestOnboardingAnswers)[]) => {
    setAnswers((prev) => {
      const next = { ...prev };
      keys.forEach((k) => (next[k] = undefined));
      return next;
    });
    nextStep();
  };
  
  return (
    <OnboardingContext.Provider
      value={{ step, answers, toggleAnswer, nextStep, prevStep, skipStep }}
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
