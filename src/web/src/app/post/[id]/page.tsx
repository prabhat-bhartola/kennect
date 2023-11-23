"use client";

import { FC } from "react";
import Post from "@/common/components/post.component";
import { Box, Divider, Typography } from "@mui/material";
import { usePost } from "@/api-sdk/hooks/post.hook";

interface pageProps {
  params: { id: string };
}

const Page: FC<pageProps> = ({ params }) => {
  const { post, isLoading, isError, mutate } = usePost(params.id);

  if (isLoading) return;

  return (
    <Box
      sx={{
        height: "100vh",
        px: "10%",
        pt: "5%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
        }}
      >
        <Post
          key={post._id}
          id={post._id}
          content={post.content}
          username={post.user.username}
          created_at={post.created_at}
        />
        <Divider sx={{ mt: "25px" }} />
        <Typography>Comments</Typography>
      </Box>
    </Box>
  );
};

export default Page;
