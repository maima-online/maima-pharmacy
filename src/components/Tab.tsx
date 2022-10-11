import { styled, Tab as MuiTab } from "@mui/material";

const Tab = styled(MuiTab)({
  "&.MuiTab-root": {
    fontFamily: "Poppins",
    fontSize: "1.1rem",
    fontWeight: 400,
    textTransform: "none",
    color: "#282828",
  },
  "&.Mui-selected": {
    color: "#CE618D",
  },
});

export { Tab };
