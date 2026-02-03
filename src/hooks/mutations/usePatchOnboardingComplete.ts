import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchOnboardingComplete } from "../../api/onboarding";
import { QUERY_KEY } from "../../constants/key";

export function usePatchOnboardingComplete () {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchOnboardingComplete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.onboarding]})
        }
    })
}