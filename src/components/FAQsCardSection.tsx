import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  borderRadius: "5px",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(() => ({
  justifyContent: "space-between",
  backgroundColor: "#C2EFFF4D",
  textAlign: "left",
  font: " normal normal 500 12px/16px Poppins, sans-serif",
  lineHeight: 1.6,
  letterSpacing: 0,
  color: "#282828",
  minHeight: 10,
  "& .MuiAccordionSummary-content": {
    width: "100%",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  textAlign: "left",
  font: "normal normal normal 12px/20px Poppins",
  letterSpacing: 0,
  color: "#282828",
}));
export default function FaqsSectionCard() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        backgroundColor: "#FFF",
        backgroundImage: `url("/images/faqbg.png")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        p: { xs: "0 10px", sm: "40px 80x", lg: "100px 800x" },
        m: { xs: "0", sm: "50px 0", md: "70px 0", lg: "100px 0" },
      }}
    >
      <Box
        component="div"
        sx={{
          width: { xs: "100%", md: "48%" },
          m: "30px auto",
          p: "20px 80px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h2"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Quicksand",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: { xs: 18, sm: 20, md: 25, lg: 30 },
                lineHeight: 1.8,
                color: "#282828",
                padding: "10px 14px",
                textTransform: "capitalize",
                m: "10px 0 0",
              }}
            >
              {" "}
              Frequently Asked Questions
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={
                  expanded === "panel1" ? (
                    <Image
                      src="/images/minus.svg"
                      alt=""
                      width="20px"
                      height="20px"
                    />
                  ) : (
                    <Image
                      src="/images/plus.svg"
                      width="20px"
                      height="20px"
                      alt=""
                    />
                  )
                }
              >
                Is Maima Pharmacy & Stores a registered Pharmacy?
              </AccordionSummary>
              <AccordionDetails>
                Yes. You may begin using the payroll application at any time
                during the year. (We can help! We offer free payroll setup to
                help you get your account set up and can enter all payroll
                history for you.)
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
                expandIcon={
                  expanded === "panel2" ? (
                    <Image
                      src="/images/minus.svg"
                      width="20px"
                      height="20px"
                      alt=""
                    />
                  ) : (
                    <Image
                      src="/images/plus.svg"
                      width="20px"
                      height="20px"
                      alt=""
                    />
                  )
                }
              >
                How else can I place an order without using the website?
              </AccordionSummary>
              <AccordionDetails>
                Asides placing your order on the website, you can also place
                your order by sending an email to orders@maimaonline.com or send
                a message on WhatsApp to this number - 08087654321.
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                aria-controls="panel3d-content"
                id="panel3d-header"
                expandIcon={
                  expanded === "panel3" ? (
                    <Image
                      src="/images/minus.svg"
                      width="20px"
                      height="20px"
                      alt=""
                    />
                  ) : (
                    <Image
                      src="/images/plus.svg"
                      width="20px"
                      height="20px"
                      alt=""
                    />
                  )
                }
              >
                How can I download the Mobile App?
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                aria-controls="panel4d-content"
                id="panel4d-header"
                expandIcon={
                  expanded === "panel4" ? (
                    <Image
                      src="/images/minus.svg"
                      width="20px"
                      height="20px"
                      alt=""
                    />
                  ) : (
                    <Image
                      src="/images/plus.svg"
                      width="20px"
                      height="20px"
                      alt=""
                    />
                  )
                }
              >
                Do you deliver outside Abuja?
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
