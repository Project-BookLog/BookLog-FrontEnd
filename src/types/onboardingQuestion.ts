import React from 'react';
import type { RequestOnboardingAnswers } from './onboarding';

export interface Option<T> {
    label: string;
    value: T;
    description?: string;
    img?: React.ComponentType<{ className?: string }>;
}

export interface Question<K extends readonly (keyof RequestOnboardingAnswers)[]> {
    id: number;
    key: K;
    label?: string;
    options: Option<NonNullable<RequestOnboardingAnswers[K[number]]>>[];
    question_max?: number;
}

export interface OnboardingQuestion {
  step: number;
  title: string;
  description?: string;
  questions:  Question<any>[];
  step_max: number;
}