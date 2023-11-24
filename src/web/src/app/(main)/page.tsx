"use client";

import { Box, Typography } from "@mui/material";
import styles from "./page.module.css";

import Post from "@/common/components/post.component";
import { usePostList } from "@/api-sdk/hooks/post.hook";
import Spinner from "@/common/components/spinner.component";
import { PostModel } from "@/api-sdk/models/Post";

export default function Home() {
  const { posts, isLoading, isError, mutate } = usePostList();
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div>Error fetching post data</div>;
  }

  return (
    <main className={styles.main}>
      <Box sx={{ p: 0, m: 0, width: { xs: "100%", md: "50%" } }}>
        <Typography variant="h4">All Post</Typography>
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
    </main>
  );
}
