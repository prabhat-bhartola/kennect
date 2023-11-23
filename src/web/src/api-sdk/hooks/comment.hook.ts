"use client";

import useSWR from "swr";
import HttpService from "@/common/services/http.service";
import CommentService from "../services/comment.service";

export function useCommentList(post_id: string) {
  const key = `${CommentService.basePath}`;
  const { data, error, isLoading, mutate } = useSWR(
    `${key}/${post_id}`,
    HttpService.getFetcher()
  );
  return {
    comments: data,
    isLoading,
    isError: error,
    mutate,
  };
}
