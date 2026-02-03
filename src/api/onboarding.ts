import type { RequestOnboardingAnswers, ResponseOnboardingAnswers } from "../types/onboarding";
import { privateApi } from "./axiosConfig";

export const getOnboardingProfile = async (): Promise<ResponseOnboardingAnswers> => {
    const { data } = await privateApi.get("/onboarding/profile");
    return data;
}

export const patchOnboardingAnswers = async (body: RequestOnboardingAnswers) => {
    const { data } = await privateApi.patch("/onboarding/answers", body);
    return data;
}

export const patchOnboardingComplete = async () => {
    const { data } = await privateApi.patch("/onboarding/complete");
    return data;
}