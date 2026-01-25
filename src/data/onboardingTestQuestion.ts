import { Onboarding_calm, Onboarding_cool, Onboarding_dark, Onboarding_dreamlike, Onboarding_pleasant, Onboarding_warm } from "../assets/icons";
import { OnboardingIcon1 } from "../components/onboarding/OnboardingIcon1";
import { OnboardingIcon2 } from "../components/onboarding/OnboardingIcon2";
import type { OnboardingQuestion } from "../types/onboardingQuestion";

export const ONBOARDING_QUESTION: OnboardingQuestion[] = [
  {
    step: 0,
    title: "어떤 방식으로 책을 읽는 편인가요?",
    description: "읽는 방식은 언제든 달라질 수 있어요.\n지금의 독서 습관과 가까운 쪽을 골라주세요.",
    questions: [
      {
        id: 0,
        options: [
          {
            label: "독서 입문자",
            img: OnboardingIcon1,
          },
          {
            label: "프로 다독러",
            img: OnboardingIcon2,
          },
        ]
      }
    ],
    step_max: 1,
  },
  {
    step: 1,
    title: "어떤 분위기의 책을 좋아하시나요?",
    description: "읽을 때 편안한 책의 분위기를 골라주세요.",
    questions: [
      {
        id: 0,
        options: [
          {
            label: "따뜻한",
            img: Onboarding_warm,
          },
          {
            label: "잔잔한",
            img: Onboarding_calm,
          },
          {
            label: "서늘한",
            img: Onboarding_cool,
          },
          {
            label: "몽환적인",
            img: Onboarding_dreamlike,
          },
          {
            label: "유쾌한",
            img: Onboarding_pleasant,
          },
          {
            label: "어두운",
            img: Onboarding_dark,
          },
        ]
      }
    ],
    step_max: 2,
  },
  {
    step: 2,
    title: "어떤 문체를 선호하시나요?",
    description: "편안하게 읽히는 글의 느낌을 알려주세요.",
    questions: [
      {
        id: 0,
        key: "문장의 호흡",
        options: [
          {
            label: "간결한",
            description: "불필요한 수식 없이 핵심만 또렷하게 전하는 문장",
          },
          {
            label: "화려한",
            description: "다채로운 어휘와 수식어로 오감을 자극하는 문장"
          },
        ],
        question_max: 1,
      },
      {
        id: 1,
        key: "표현의 질감",
        options: [
          {
            label: "담백한",
            description: "과한 꾸밈없이 진솔하며 매끄럽게 읽히는 문장",
          },
          {
            label: "섬세한",
            description: "세밀한 묘사로 이야기 속 장면의 밀도를 높인 문장"
          },
        ],
        question_max: 1,
      },
      {
        id: 2,
        key: "표현의 방향",
        options: [
          {
            label: "직설적",
            description: "에두르지 않고 사건 본질을 바로 꿰뚫는 문장",
          },
          {
            label: "은유적",
            description: "비유와 상징으로 의미를 전달하는 문장"
          },
        ],
        question_max: 1,
      },
    ],
    step_max: 3,
  },
  {
    step: 3,
    title: "책을 펼칠 때, 어떤 순간이 좋으신가요?",
    description: "평소 즐거움을 느끼는 독서 스타일을 선택해 주세요.",
    questions: [
      {
        id: 0,
        options: [
          {
            label: "기분 전환",
            description: "부담 없이\n술술 읽히는 글",
          },
          {
            label: "지적인 탐구",
            description: "사유의 깊이를\n더해주는 글",
          },
          {
            label: "압도적 몰입",
            description: "순식간에\n몰입하게 되는 글",
          },
          {
            label: "짙은 여운",
            description: "오랫동안\n잔상이 남는 글",
          },
        ],
      },
    ],
    step_max: 1,
  },
];