"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  styled,
} from "@mui/material";

import { AccountCircle } from "@mui/icons-material";

interface Props {
  id: string;
  content: string;
  username: string;
  created_at: string;
}

function StaticPost(props: Props) {
  const { id, content, username, created_at } = props;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          pl: "10%",
        }}
      >
        <AccountCircle />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Typography>{username}</Typography>
          <Typography>{created_at}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography>{content}</Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default StaticPost;
