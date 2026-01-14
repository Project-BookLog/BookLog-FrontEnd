import React from 'react';

export interface Option {
    label: string;
    description?: string;
    img?: React.ComponentType<{ className?: string }>;
}

export interface Question {
    id: number;
    key?: string
    options: Option[];
    question_max?: number;
}

export interface OnboardingQuestion {
  step: number;
  title: string;
  description?: string;
  questions: Question[];
  step_max: number;
}