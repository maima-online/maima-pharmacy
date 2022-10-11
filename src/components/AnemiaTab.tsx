import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import AnemiaDrugCard from "./AnemiaDrugCard";

const AntTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,

  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  fontWeight: 500,
  marginRight: 8,
  fontSize: 16,
  color: "#ddd",
  fontFamily: "Roboto",
  "&:hover": {
    color: "#E4AA44",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#E4AA44",
    fontWeight: 600,
    borderBottom: "1px solid #E4AA44",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#E4AA44",
  },
}));

interface StyledTabProps {
  label: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AnemiaTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const card1 = {
    name: "Antiemetic",
    text: " Nicotinic Acid Tabs Vitamins, Blood",
    amount: "₦2250",
    image: "/images/drug2.png",
  };
  const card2 = {
    name: "Anzitor",
    text: " Nicotinic Acid Tabs Vitamins, Blood",
    amount: "₦950",
    image: "/images/anzitor.png",
  };
  const card3 = {
    name: "Pilosol",
    text: " Nicotinic Acid Tabs Vitamins, Blood",
    amount: "₦1250",
    image: "/images/pilosol.png",
  };
  const card4 = {
    name: "Monas",
    text: " Nicotinic Acid Tabs Vitamins, Blood",
    amount: "₦750",
    image: "/images/monas.png",
  };
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ width: 250, m: "0px auto" }}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Top Offers" {...a11yProps(0)} />
          <AntTab label="Shop By Brand" {...a11yProps(1)} />
        </AntTabs>
        {/* <Box sx={{ p: 3 }} sx={{ px: { xs: 1.5, md: 10 } }} /> */}
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <AnemiaDrugCard card={card1} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <AnemiaDrugCard card={card2} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <AnemiaDrugCard card={card3} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <AnemiaDrugCard card={card4} />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <AnemiaDrugCard card={card1} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <AnemiaDrugCard card={card2} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <AnemiaDrugCard card={card3} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <AnemiaDrugCard card={card4} />
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
}
