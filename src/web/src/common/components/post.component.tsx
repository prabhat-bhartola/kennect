"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  styled,
} from "@mui/material";

import Link from "next/link";
import { AccountCircle } from "@mui/icons-material";

const MyLink = styled(Link)({
  width: "100%",
});

interface Props {
  id: string;
  content: string;
  username: string;
  created_at: string;
}

function Post(props: Props) {
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
      <MyLink href={`/post/${id}`}>
        <CardActionArea
          sx={{
            display: "flex",
            justifyContent: "start",
            flexDirection: "row",
            pl: "10%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
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
        </CardActionArea>
      </MyLink>
    </Card>
  );
}

export default Post;
