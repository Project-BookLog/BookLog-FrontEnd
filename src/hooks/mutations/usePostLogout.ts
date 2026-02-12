import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../api/auth";

export const usePostLogout = () => {
  return useMutation({
    mutationFn: postLogout,
  });
};