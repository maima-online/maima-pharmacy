import React from "react";
import { CircularProgress, Stack } from "@mui/material";

const PageLoader = () => {
  return (
    <Stack direction={"row"} alignItems="center" justifyContent={"center"}>
      <CircularProgress />
    </Stack>
  );
};

export default PageLoader;
