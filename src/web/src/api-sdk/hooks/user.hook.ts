import HttpService from "@/common/services/http.service";
import UserService from "../services/user.service";
import useSWR from "swr";

export function useUser() {
  const key = `${UserService.basePath}/me`;

  const { data, error, isLoading, mutate } = useSWR(
    `${key}`,
    HttpService.getFetcher()
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}
