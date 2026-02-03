import { useNavigate } from "react-router-dom";
import { BackIcon } from "../../../assets/icons";
import { OnboardingIcon2 } from "../../../components/onboarding/OnboardingIcon2";
import { useOnboarding } from "../../../context/OnboardingContext";
import type { RequestOnboardingAnswers } from "../../../types/onboarding";
import { usePatchOnboardingAnswers } from "../../../hooks/mutations/usePatchOnboardingAnswers";
import { useEffect, useRef } from "react";
import { usePatchOnboardingComplete } from "../../../hooks/mutations/usePatchOnboardingComplete";

const DEFAULT_ONBOARDING_PROFILE: RequestOnboardingAnswers = {
  readerType: "BEGINNER_READER",
  preferredMood1: "CALM",
  preferredMood2: "WARM",
  sentenceBreath: "CONCISE",
  expressionTexture: "PLAIN",
  expressionDirection: "DIRECT",
  readingMoment: "ROUTINE_TRANSITION",
};

export default function CompletePage() {
  const { answers, prevStep } = useOnboarding();
  const { mutate: patchOnboardingAnswers } = usePatchOnboardingAnswers();
  const { mutate: patchOnboardingComplete } = usePatchOnboardingComplete();

  const hasPatchedRef = useRef(false);
  const navigate = useNavigate();

  const { preferredMood1, preferredMood2 } = {
    ...DEFAULT_ONBOARDING_PROFILE,
    ...Object.fromEntries(
      Object.entries(answers).filter(([, v]) => v !== undefined)
    ),
  };

  let finalMood1 = preferredMood1;
  let finalMood2 = preferredMood2;

  if (finalMood1 === finalMood2) {
    finalMood2 = finalMood1 === "CALM" ? "WARM" : "CALM";
  }

  const finalAnswers: RequestOnboardingAnswers = {
    ...DEFAULT_ONBOARDING_PROFILE,
    ...Object.fromEntries(
      Object.entries(answers).filter(([, v]) => v !== undefined)
    ),
    preferredMood1: finalMood1,
    preferredMood2: finalMood2,
  };

  useEffect(() => {
    if (hasPatchedRef.current) return;
    hasPatchedRef.current = true;

    patchOnboardingAnswers(finalAnswers, {
      onSuccess: () => {
        patchOnboardingComplete();
      },
    });
  }, [patchOnboardingAnswers, patchOnboardingComplete, finalAnswers, navigate]);

  console.log(finalAnswers);

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center">
      <div className="flex w-full h-[62px] px-5 pt-5 pb-2 justify-between items-center">
        <BackIcon
          className="w-[24px] h-[24px]"
          onClick={prevStep}
        />
      </div>
      <div className="flex flex-1 justify-center w-[286px] flex-col items-center gap-10">
        <OnboardingIcon2 />
        <div className="flex flex-col items-center gap-3 self-stretch">
          <p className="self-stretch text-center text-title-01 text-[#000]">독서 취향이 저장되었어요</p>
          <p className="self-stretch text-center text-body-01-m text-[#949494]">취향을 반영하여 추천 서비스를 제공합니다.</p>
        </div>
      </div>
      <div className="flex flex-end self-stretch px-5 pt-5 pb-0 gap-[2px]">
        <button
          onClick={() => navigate("/")}
          className="flex w-[335px] px-[10px] py-[16px] justify-center items-center gap-[10px] rounded-[12px] bg-primary active:bg-[#263A99] text-white"
        >
          <p className="text-center text-subtitle-02-sb">
            확인
          </p>
        </button>
      </div>
    </div>
  );
}
