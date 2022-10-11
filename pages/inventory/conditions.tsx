import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Grid, IconButton, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import { lighten } from "polished";
import { ReactElement, useState } from "react";
import { useApi } from "../../hooks/axiosApi";
import AdminDashboardLayout from "../../src/components/AdminLayout";
import Callout, { MenuCheckbox } from "../../src/components/callout";
import { OutlinedSearch } from "../../src/components/form/textFields";
import {
  FormSubTitle,
  FormTitle,
  Goback,
} from "../../src/components/form/textFields/styles";
import { Colors } from "../../src/components/form/themes/colors";
import { Fonts } from "../../src/components/form/themes/fonts";
import AddConditon from "../../src/components/Inventory/conditions/AddCondition";
import DeleteCondition from "../../src/components/Inventory/conditions/DeleteCondition";
import EditCondition from "../../src/components/Inventory/conditions/EditCondion";
import { ArrowBack } from "../../src/components/svgs";
import styles from "../../styles/Inventory.module.css";

export default function ConditionsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [serialNumber, setSerialNumber] = useState(1);
  const [subResult, setSubResult] = useState(10);
  const rowsPerPage = 120;
  const { data: conditions, error, isLoading } = useApi("inventory-conditions");

  const TOTAL_RESULT = conditions?.length;
  const TOTAL_PAGE = Math.ceil(TOTAL_RESULT / rowsPerPage);

  const handleChangePageBack = () => {
    page > 1 ? setPage(page - 1) : setPage(0);
    setSerialNumber(serialNumber - rowsPerPage);
    setSubResult(subResult - rowsPerPage);
  };
  const handleChangePageForward = () => {
    page < TOTAL_PAGE ? setPage(page + 1) : setPage(TOTAL_PAGE);
    setSerialNumber(serialNumber + rowsPerPage);
    setSubResult(subResult + (conditions?.length - rowsPerPage));
  };
  const getPageStart = (pageSize: number, pageNr: number) => {
    return pageSize * pageNr;
  };

  const getPageLabel = (total: number, pageSize: number, pageNr: number) => {
    const start = Math.max(getPageStart(pageSize, pageNr), 0);
    const end = Math.min(getPageStart(pageSize, pageNr + 1), total);
    return `${start + 1} - ${end}`;
  };
  return (
    <div>
      <Head>
        <title>Conditions detail - Maima</title>
        <meta name="description" content="Inventory conditions page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={6}>
          <Goback onClick={() => router.push("/inventory")}>
            <ArrowBack /> Back to inventory
          </Goback>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              //   m: { xs: 0, lg: "-40px 0 20px" },
            }}
          >
            <AddConditon />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            component="div"
            sx={{
              width: "100%",
              display: { xs: "block", md: "flex" },
              justifyContent: { xs: "normal", md: "space-between" },
              //   alignItems: "flex-end",
              mt: { xs: 1, md: 0 },
            }}
          >
            <div className={styles.pageTitleCard}>
              <FormTitle>All conditions</FormTitle>
              <FormSubTitle style={{ marginTop: -10 }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </FormSubTitle>
            </div>
            <OutlinedSearch
              id="search"
              name="search"
              value={search}
              placeholder="Search by name of condition"
              borderBottom={false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              ghost
              style={{ width: 220, float: "right" }}
            />
          </Box>
        </Grid>
      </Grid>
      <Box
        component="div"
        sx={{
          width: "100%",
          display: "flex",
          flexGrow: 1,
          my: 3,
          p: 1,
          background: lighten(0.06, "#E5E5E5"),
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={1}>
          {conditions
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((condition: { name: string }, i: number) => (
              <>
                <Grid item xs={12} sm={4} lg={3} xl={1} key={i}>
                  <Grid item xs={12}>
                    <div
                      className="line"
                      style={{ borderBottom: "1px solid #e5e7eb" }}
                    ></div>
                  </Grid>
                  <div className={styles.conditioncard}>
                    <MenuCheckbox>
                      <ListItemButton
                        sx={{
                          p: 0,
                          minHeight: 25,
                          color: Colors.greyDark,
                          "&:hover": {
                            background: lighten(0.001, "#E5E5E5"),
                          },
                        }}
                      >
                        <ListItemText
                          primary={condition.name}
                          primaryTypographyProps={{
                            fontFamily: Fonts.primary,
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: 12,
                            lineHeight: "16px",
                            color: Colors.greyDark,
                          }}
                        />
                        <Callout
                          TopAction={<EditCondition />}
                          BottomAction={<DeleteCondition />}
                        />
                      </ListItemButton>
                    </MenuCheckbox>
                  </div>
                  <Grid item xs={12}>
                    <div
                      className="line"
                      style={{ borderBottom: "1px solid #e5e7eb" }}
                    ></div>
                  </Grid>
                </Grid>
              </>
            ))}
        </Grid>
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          font: `normal normal 400 12px/20px ${Fonts.primary}`,
          color: "#6B7280",
        }}
      >
        <Box component="div" sx={{ width: "100%" }}>
          {getPageLabel(conditions?.length, rowsPerPage, page)} of{" "}
          {TOTAL_RESULT} results
        </Box>
        <Box
          component="div"
          sx={{ width: "10%", display: "flex", position: "relative" }}
        >
          {page + 1} of {TOTAL_PAGE}
          <Box
            component="span"
            sx={{
              display: "flex",
              position: "absolute",
              left: "auto",
              right: 12,
              top: -7,
            }}
          >
            <IconButton onClick={handleChangePageBack} disabled={page === 0}>
              <ArrowBackIcon sx={{ fontSize: "18px", cursor: "pointer" }} />
            </IconButton>{" "}
            <IconButton
              onClick={handleChangePageForward}
              disabled={page + 1 === TOTAL_PAGE}
            >
              <ArrowForwardIcon sx={{ fontSize: "18px" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
ConditionsPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
