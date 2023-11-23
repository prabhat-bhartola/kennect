"use client";

import useSWR from "swr";
import PostService from "../services/post.service";
import HttpService from "@/common/services/http.service";

export function usePostList() {
  const key = `${PostService.basePath}`;
  const { data, error, isLoading, mutate } = useSWR(
    `${key}`,
    HttpService.getFetcher()
  );
  return {
    posts: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function usePost(id: string) {
  const key = `${PostService.basePath}`;

  const { data, error, isLoading, mutate } = useSWR(
    `${key}/${id}`,
    HttpService.getFetcher()
  );

  return {
    post: data,
    isLoading,
    isError: error,
    mutate,
  };
}
