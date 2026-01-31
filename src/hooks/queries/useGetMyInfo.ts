import { useQuery } from "@tanstack/react-query"
import type { ResponseMyInfoDto } from "../../types/auth"
import { QUERY_KEY } from "../../constants/key"
import { getMyInfo } from "../../api/auth"

export const useGetMyInfo = () => {
    return useQuery<ResponseMyInfoDto>({
        queryKey: [QUERY_KEY.myInfo],
        queryFn: getMyInfo,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}