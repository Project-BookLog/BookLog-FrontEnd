import { useOnboarding } from "../../../context/OnboardingContext";
import { ONBOARDING_QUESTION } from "../../../data/onboardingTestQuestion";
import { BackIcon } from "../../../assets/icons";

export default function Step_3_Page() {
  const { answers, toggleAnswer, nextStep, prevStep, skipStep } = useOnboarding();
  const stepData = ONBOARDING_QUESTION[3];
  const selected = answers[3] || [];

  const canNext = selected.length === stepData.step_max;
  
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center">
      <div className="flex w-full h-[62px] px-5 pt-5 pb-2 justify-between items-center">
        <BackIcon
          className="w-[24px] h-[24px]"
          onClick={prevStep}
        />
        <button
          className="text-subtitle-02-sb text-gray-600"
          onClick={skipStep}
        >
          건너뛰기
        </button>
      </div>

      <div className="flex w-[335px] flex-col items-start gap-8 mt-6">
        <div className="flex items-center h-[8px] gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-gray-300"></span>
          <span className="w-[8px] h-[8px] rounded-full bg-gray-300"></span>
          <span className="w-[8px] h-[8px] rounded-full bg-gray-300"></span>
          <span className="w-[20px] h-[8px] rounded-[4px] bg-primary"></span>
        </div>
        <div className="flex flex-col items-start gap-[8px] self-stretch">
          <p className="self-stretch text-black text-title-01">{stepData.title}</p>
          <p className="self-stretch text-gray-700 text-subtitle-02-m whitespace-pre-line">{stepData.description}</p>
        </div>
      </div>

      <div className="flex flex-1 w-[375px] px-5 justify-center items-start content-start gap-[7px] flex-wrap mt-[60px]">
        {stepData.questions[0].options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => toggleAnswer(stepData.step, opt.label, stepData.step_max)}
            className={`flex w-[162px] h-[164px] px-6 py-3 flex-col justify-center items-center gap-[6px] shrink-0 rounded-[12px] bg-gray-100 ${selected.includes(opt.label) ? "bg-lightblue-1" : "bg-gray-100" }`}
          >
            <p className={`text-center text-subtitle-01-sb ${ !(selected.length > 0) ? "text-gray-900" : selected.includes(opt.label) ? "text-primary" : "text-gray-400"}`}>{opt.label}</p>
            <p className={`self-stretch text-body-03 whitespace-pre-line ${ !(selected.length > 0) ? "text-gray-700" : selected.includes(opt.label) ? "text-gray-700" : "text-gray-300" }`}>{opt.description}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-end self-stretch px-5 pt-5 pb-0 gap-[2px]">
        <button
          onClick={nextStep}
          disabled={!canNext}
          className="flex w-[335px] px-[10px] py-[16px] justify-center items-center gap-[10px] rounded-[12px] bg-primary disabled:bg-gray-200 text-white disabled:text-gray-600"
        >
          <p className="text-center text-subtitle-02-sb">
            다음
          </p>
        </button>
      </div>
    </div>
  );
}
