import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchOnboardingAnswers } from "../../api/onboarding";
import { QUERY_KEY } from "../../constants/key";

export function usePatchOnboardingAnswers () {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchOnboardingAnswers,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.onboarding]})
        }
    })
}