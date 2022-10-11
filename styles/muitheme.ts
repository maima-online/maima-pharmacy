import { createTheme } from "@mui/material";

const muiTheme = createTheme({
  components: {
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
  },
  palette: {
    primary: {
      main: "#568089",
    },
  },
  typography: {
    fontFamily: ["Poppins, sans-serif"].join(","),
  },
});

export default muiTheme;
