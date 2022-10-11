import { Stack, Typography } from "@mui/material";
import React from "react";

interface PageBannerTypes {
  title: string;
  // color: string;
}

const PageBanner = ({ title }: PageBannerTypes) => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        height: 200,
        width: "100%",
        backgroundImage: `url("/images/pageBanner.svg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundSize: "cover",
        p: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          font: {
            xs: "normal normal 800 25px/35px Roboto, sans-serif",
            sm: "normal normal 800 30px/37px Roboto, sans-serif",
            md: "normal normal 800 35px/47px Roboto, sans-serif",
            textTransform: "capitalize",
          },
          // color: color ? color : "#568089",
          color: "#2651A3",
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default PageBanner;
