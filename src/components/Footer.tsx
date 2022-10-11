import { Box, Grid, Link, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import footerItems from "../../utils/constants/footer";
import { containerPadding } from "../../utils/constants/global/globalStyling";
import Logo from "./Logo";

const Item = styled(Link)({
  color: "#282828",
  fontSize: "1.1rem",
  fontWeight: 400,
  margin: "0.7rem 0",
  textDecorationLine: "none",
  whiteSpace: "nowrap",
});

const footerGrid = [
  { xs: 12, sm: 12, md: 4, lg: 4 },
  { xs: 12, sm: 12, md: 4, lg: 4 },
];

function Footer() {
  const [showScroll, setShowScroll] = useState(false);
  const scrollTop = () => {
    // window.scrollTo({ top: 0, behavior: "smooth" })
  };
  // const checkScrollTop = () => {
  //   if (!showScroll && globalThis.window.pageYOffset > 400) {
  //     setShowScroll(true);
  //   } else if (showScroll && globalThis.window.pageYOffset <= 400) {
  //     setShowScroll(false);
  //   }
  // };
  // const scrollTop = () => {
  //   globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
  // };
  // globalThis.window.addEventListener("scroll", checkScrollTop);
  // function handleScroll() {}
  // console.log("globalThis", globalThis);
  return (
    <footer>
      <Box
        sx={{
          backgroundColor: "rgba(247, 250, 254, 0.57)",
          pt: 4,
          pb: 2,
          ...containerPadding,
        }}
      >
        <Grid container columnSpacing={5} rowGap={0}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Logo height={100} width={250} />
          </Grid>
          {footerItems.map(({ title, items, ...rest }, index) => (
            <Grid item key={title} {...rest} {...footerGrid[index]}>
              <Typography
                variant="h4"
                sx={{
                  display: "flex",
                  color: "#282828",
                  font: "normal normal 275 25px/38px Poppins, sans-serif",
                  mb: "10px",
                }}
              >
                {title}
              </Typography>
              <div className="line" />
              <Stack
                sx={{
                  display: "flex",
                  alignItems: "start",
                }}
              >
                {items.map(({ name, url }) => (
                  <Item
                    key={name}
                    href={url}
                    underline="hover"
                    sx={{
                      color: "#282828",
                      font: "normal normal 400 12px/16px Poppins, sans-serif !important",
                    }}
                  >
                    {name}
                  </Item>
                ))}
              </Stack>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box
              style={{
                position: "relative",
                top: -50,
                left: -20,
                font: "normal normal 600 12px/16px Poppins, sans-serif",
                color: "#282828",
                cursor: "pointer",
              }}
              onClick={scrollTop}
            >
              <Box
                component="span"
                sx={{
                  fontSize: 60,
                  color: "#568089",
                  opacity: 0.3,
                  position: "absolute",
                }}
              >
                &#9679;
              </Box>
              <Box
                component="span"
                sx={{
                  position: "relative",
                  top: -4,
                  left: 16,
                  mr: 3,
                }}
              >
                Back To Top
              </Box>
              <Image
                src="/images/svgs/topArrow.svg"
                alt=""
                height={20}
                width={20}
                layout="fixed"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Stack
              sx={{
                display: "flex",
                alignItems: "start",
                flexDirection: "row",
                mt: 7,
              }}
            >
              <Item
                href={"/terms"}
                underline="hover"
                sx={{
                  color: "#282828",
                  font: "normal normal 400 12px/16px Poppins, sans-serif",
                  m: "0 20px",
                }}
              >
                Terms
              </Item>
              <Item
                href={"/privacy"}
                underline="hover"
                sx={{
                  color: "#282828",
                  font: "normal normal 400 12px/16px Poppins, sans-serif",
                  m: "0 20px",
                }}
              >
                Privacy
              </Item>
              <Item
                href={"/cookies"}
                underline="hover"
                sx={{
                  color: "#282828",
                  font: "normal normal 400 12px/16px Poppins, sans-serif",
                  m: "0 20px",
                }}
              >
                Cookies
              </Item>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography
              variant="subtitle1"
              sx={{
                mt: 7,
                mb: 2,
                color: "rgba(180, 181, 181, 1)",
                fontWeight: 400,
              }}
            >
              Adetokunbo Ademola Crescent, Wuse 2 904101, Abuja
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
}

export default Footer;
