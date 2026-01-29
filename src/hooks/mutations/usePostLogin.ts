import { useMutation } from "@tanstack/react-query"
import type { RequestLoginDto, ResponseLoginDto } from "../../types/auth"
import { postLogin } from "../../api/auth"

export const usePostLogin = () => {
    return useMutation<ResponseLoginDto, Error, RequestLoginDto>({
        mutationFn: (loginData) => postLogin(loginData),
    })
}