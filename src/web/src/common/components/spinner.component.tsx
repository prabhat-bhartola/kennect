"use client";

import { CircularProgress } from "@mui/material";

function Spinner() {
  return (
    <CircularProgress
      color="success"
      sx={{ mx: "auto", justifyContent: "center" }}
    />
  );
}

export default Spinner;
