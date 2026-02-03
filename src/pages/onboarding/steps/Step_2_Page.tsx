import { useOnboarding } from "../../../context/OnboardingContext";
import { ONBOARDING_QUESTION } from "../../../data/onboardingTestQuestion";
import { BackIcon } from "../../../assets/icons";
import type { RequestOnboardingAnswers } from "../../../types/onboarding";

export default function Step_2_Page() {
  const { answers, toggleAnswer, nextStep, prevStep, skipStep } = useOnboarding();
  const stepData = ONBOARDING_QUESTION[2];

  const canNext = stepData.questions.every((question) => {
    const keys = question.key as readonly (keyof RequestOnboardingAnswers)[];
    return keys.some((k) => answers[k] != null);
  });

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center">

      <div className="flex w-full h-[62px] px-5 pt-5 pb-2 justify-between items-center">
        <BackIcon
          className="w-[24px] h-[24px]"
          onClick={prevStep}
        />
        <button
          className="text-subtitle-02-sb text-gray-600"
          onClick={() =>
            skipStep(
              stepData.questions.flatMap(
                (q) => q.key as readonly (keyof RequestOnboardingAnswers)[]
              )
            )
          }
        >
          건너뛰기
        </button>
      </div>

      <div className="flex w-[335px] flex-col items-start gap-8 mt-6">
        <div className="flex items-center h-[8px] gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-gray-300"></span>
          <span className="w-[8px] h-[8px] rounded-full bg-gray-300"></span>
          <span className="w-[20px] h-[8px] rounded-[4px] bg-primary"></span>
          <span className="w-[8px] h-[8px] rounded-full bg-gray-300"></span>
        </div>
        <div className="flex flex-col items-start gap-[8px] self-stretch">
          <p className="self-stretch text-black text-title-01">{stepData.title}</p>
          <p className="self-stretch text-gray-700 text-subtitle-02-m whitespace-pre-line">{stepData.description}</p>
        </div>
      </div>

      <div className="flex flex-col flex-1 items-start w-[335px] gap-7 mt-[36px]">
        {stepData.questions.map((question) => {
          const keys = question.key as readonly (keyof RequestOnboardingAnswers)[];

          const selectedValues = keys
            .map((k) => answers[k])
            .filter(
              (v): v is NonNullable<RequestOnboardingAnswers[keyof RequestOnboardingAnswers]> =>
                v != null
          );

          const selectedCountInQuestion = selectedValues.length;

          return (
            <div
              key={question.id}
              className="flex flex-col items-start gap-[10px] self-stretch"
            >
              <p className="self-stretch text-gray-700 text-body-01-m">{question.label}</p>
              <div className="flex justify-between items-center self-stretch">
                {question.options.map((opt) => {
                  const isSelected = selectedValues.includes(opt.value);
                  const isDisabled = !isSelected && question.question_max != null && selectedValues.length >= question.question_max;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => toggleAnswer( question.key as readonly (keyof RequestOnboardingAnswers)[], opt.value, question.question_max )}
                      disabled={isDisabled}
                      className={`flex w-[164px] px-5 py-[14px] flex-col justify-center items-start gap-[4px] rounded-[12px] bg-gray-100 ${ isSelected ? "bg-lightblue-1" : "bg-gray-100" } cursor-pointer`}
                    >
                      <p className={`text-center text-subtitle-01-sb ${!(selectedCountInQuestion > 0) ? "text-gray-900" : `${isSelected ? "text-primary" : "text-gray-400" }`}`}>{opt.label}</p>
                      <p className={`text-start self-stretch text-caption-01 ${!(selectedCountInQuestion > 0) ? "text-gray-700" : `${isSelected ? "text-gray-700" : "text-gray-300" }`}`}>{opt.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-end self-stretch px-5 pt-5 pb-0 gap-[2px]">
        <button
          onClick={nextStep}
          disabled={!canNext}
          className="flex w-[335px] px-[10px] py-[16px] justify-center items-center gap-[10px] rounded-[12px] bg-primary active:bg-[#263A99] disabled:bg-gray-200 text-white disabled:text-gray-600"
        >
          <p className="text-center text-subtitle-02-sb">
            다음
          </p>
        </button>
      </div>
    </div>
  );
}
