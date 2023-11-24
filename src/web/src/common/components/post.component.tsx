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

  const date = new Date(created_at);

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
            justifyContent: "left",
            flexDirection: "column",
            px: "5%",
            alignItems: "left",
            pt: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "left",
              justifyContent: "start",
              width: "100%",
            }}
          >
            <AccountCircle />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                justifyContent: "space-around",
                pl: "10px",
              }}
            >
              <Typography>{username}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CardContent>
              <Typography>{content}</Typography>
            </CardContent>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              {date.toLocaleTimeString("en-US", {
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              UTC
            </Typography>
            <Typography>{date.toLocaleDateString()}</Typography>
          </Box>
        </CardActionArea>
      </MyLink>
    </Card>
  );
}

export default Post;
