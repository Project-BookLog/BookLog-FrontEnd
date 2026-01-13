import { useOnboarding } from "../../../context/OnboardingContext";
import { ONBOARDING_QUESTION } from "../../../data/onboardingTestQuestion";
import { BackIcon } from "../../../assets/icons";

export default function Step_1_Page() {
  const { answers, toggleAnswer, nextStep, prevStep, skipStep } = useOnboarding();
  const stepData = ONBOARDING_QUESTION[1];
  const selected = answers[1] || [];

  const canNext = selected.length >= 1 || selected.length >= stepData.step_max;
  
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
            <span className="w-[20px] h-[8px] rounded-[4px] bg-primary"></span>
            <span className="w-[8px] h-[8px] rounded-full bg-gray-300"></span>
            <span className="w-[8px] h-[8px] rounded-full bg-gray-300"></span>
          </div>
          <div className="flex flex-col items-start gap-[8px] self-stretch">
            <p className="self-stretch text-black text-title-01">{stepData.title}</p>
            <p className="self-stretch text-gray-700 text-subtitle-02-m whitespace-pre-line">{stepData.description}</p>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-start w-[335px] gap-3 mt-[77px]">
          <p className="self-stretch text-body-03 text-gray-500">최대 {stepData.step_max}개까지 선택할 수 있어요.</p>
          <div className="flex items-start content-start gap-[7px] self-stretch flex-wrap">
            {stepData.questions[0].options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => toggleAnswer(stepData.step, opt.label, stepData.step_max)}
                className={`relative flex flex-col justify-center items-center w-[164px] h-[66px] gap-[5px] rounded-[12px] ${ selected.includes(opt.label) && "bg-lightblue-1" } cursor-pointer`}
              >
                {!selected.includes(opt.label) && opt.img && (
                  <opt.img className="absolute inset-0 w-full h-full rounded-[12px]" />
                )}
                <p className={`text-center text-subtitle-01-sb ${selected.includes(opt.label) && "text-primary"}`}>{opt.label}</p>
              </button>
            ))}
          </div>
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
