"use client";

import { Box, Typography } from "@mui/material";
import styles from "./page.module.css";

import Post from "@/common/components/post.component";
import { usePostList } from "@/api-sdk/hooks/post.hook";
import Spinner from "@/common/components/spinner.component";
import { PostModel } from "@/api-sdk/models/Post";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function Home() {
  if (Cookies.get("access_token") === undefined) {
    redirect("/login");
  }

  const { posts, isLoading, isError, mutate } = usePostList();
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div>Error fetching post data</div>;
  }

  return (
    <Box
      sx={{
        p: 0,
        m: 0,
        mx: { xs: "10%", sm: "25%" },
      }}
    >
      <Typography variant="h4">All Posts</Typography>
      {posts?.map((post: PostModel) => (
        <Post
          key={post._id}
          id={post._id}
          content={post.content}
          username={post.user.username}
          created_at={post.created_at}
        />
      ))}
    </Box>
  );
}
