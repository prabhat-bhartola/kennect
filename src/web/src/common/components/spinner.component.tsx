"use client";

import { Box, CircularProgress } from "@mui/material";

function Spinner() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="success" />
    </Box>
  );
}

export default Spinner;
