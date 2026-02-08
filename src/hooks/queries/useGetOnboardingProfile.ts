import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getOnboardingProfile } from "../../api/onboarding";

export function useGetOnboardingProfile () {
    return useQuery({
        queryKey: [QUERY_KEY.onboarding],
        queryFn: getOnboardingProfile,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: !!localStorage.getItem("accessToken"),
    });
};