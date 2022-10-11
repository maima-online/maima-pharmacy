import {
  Box,
  Divider as MuiDivider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";

interface CardSectionProps {
  children: React.ReactNode;
}

const Divider = styled(MuiDivider)({
  backgroundColor: "#E4AA44",
  flexGrow: 1,
  height: 3,
});

export default function AnemiaSectionCard({ children }: CardSectionProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#FDF3ED",
        py: 5,
      }}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        sx={{
          mb: 5,
        }}
      >
        <Divider />
        <Box sx={{ px: { xs: 3, md: 10 } }}>
          <Typography
            variant="h6"
            sx={{
              color: "#F08832",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 800,
              fontSize: { xs: 20, sm: 25, md: 30 },
              lineHeight: 1.8,
              textAlign: "center",
            }}
          >
            Anemia Section
          </Typography>
        </Box>
        <Divider />
      </Stack>
      <Box sx={{ px: { xs: 1.5, md: 10 }, mb: { xs: 1.5, md: 3 } }}>
        {children}
      </Box>
    </Box>
  );
}
