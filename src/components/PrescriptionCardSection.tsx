import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function PrescriptionSectionCard() {
  return (
    <Box
      component="div"
      sx={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 10%, rgba(196,239,255,1) 100%)",
        p: { xs: "10px", sm: "20px 40px 20px", md: "80px 200px  20px" },
        display: "flex",
        width: "100%",
      }}
    >
      <Box
        component="div"
        sx={{ width: { xs: "100%", md: "80%" }, m: "30px auto" }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Box
              component="div"
              sx={{
                width: 280,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "left",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Quicksand",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: 30,
                  lineHeight: { xs: 1.32, sm: 1.4 },
                  color: "#000",
                  m: "40px 0 16px",
                }}
              >
                Do You Have A Prescription?
              </Typography>
              <Box
                component="div"
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 300,
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: "#000",
                  width: "100%",
                  margin: "8px 0",
                }}
              >
                Some drugs can only be bought with a prescription issued by a
                verified Doctor. Upload your prescription and get your medicine
                delivered to you.
              </Box>
              <Typography
                variant="button"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#EA3973",
                  borderRadius: 10,
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "#FFF",
                  padding: "10px 14px",
                  textTransform: "capitalize",
                  m: "10px 0 0",
                }}
              >
                Upload Prescription
              </Typography>
              <Box
                component="div"
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 300,
                  fontSize: 17,
                  lineHeight: 1.8,
                  color: "#000",
                  textTransform: "capitalize",
                  m: "80px 0 0",
                }}
              >
                Don’t have a prescription?{" "}
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: 17,
                    lineHeight: 1.8,
                    color: "#4A91BF",
                    textDecoration: "underline",
                    textTransform: "capitalize",
                  }}
                >
                  <Link href="/e-prescription">
                    <a>Talk to a Doctor or Pharmacist now!</a>
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-end" },
                alignItems: { xs: "center", sm: "flex-end" },
              }}
            >
              <Image
                src="/images/calldoc.png"
                alt="pharmacist on call"
                width={550}
                height={700}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
