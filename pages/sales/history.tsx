import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { useApi } from "../../hooks/axiosApi";
import AdminDashboardLayout from "../../src/components/AdminLayout";
import {
  FormSubTitle,
  FormTitle,
  Goback,
} from "../../src/components/form/textFields/styles";
import { Colors } from "../../src/components/form/themes/colors";
import { Fonts } from "../../src/components/form/themes/fonts";
import ViewReceipt from "../../src/components/Sales/ViewReceipt";
import { ArrowBack } from "../../src/components/svgs";
import styles from "../../styles/Inventory.module.css";
const columns = [
  {
    id: "sn",
    label: "S/N",
    minWidth: 20,
    align: "center",
  },
  {
    id: "date",
    label: "Date",
    minWidth: 80,
    align: "center",
  },
  {
    id: "orderNo",
    label: "Order No.",
    minWidth: 80,
    align: "center",
  },
  {
    id: "servedBy",
    label: "Served By",
    minWidth: 20,
    align: "center",
  },
  {
    id: "paymentMethod",
    label: "Payment Method",
    minWidth: 80,
    align: "center",
  },
  {
    id: "total",
    label: "Total (₦)",
    minWidth: 80,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 80,
    align: "right",
  },
];
function createData(
  sn: number,
  date: string,
  orderNo: string,
  servedBy: string,
  paymentMethod: string,
  total: string,
  action: any
) {
  return { sn, date, orderNo, servedBy, paymentMethod, total, action };
}

export default function SalesHistoryPage() {
  const router = useRouter();
  const { data: products, error, isLoading } = useApi("products");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [serialNumber, setSerialNumber] = useState(0);
  const [subResult, setSubResult] = useState(10);
  const [search, setSearch] = useState("");

  const handleChangePageBack = () => {
    page > 1 ? setPage(page - 1) : setPage(0);
    setSerialNumber(serialNumber - rowsPerPage);
    setSubResult(subResult - rowsPerPage);
  };
  const handleChangePageForward = () => {
    page < TOTAL_PAGE ? setPage(page + 1) : setPage(TOTAL_PAGE);
    setSerialNumber(serialNumber + rowsPerPage);
    setSubResult(subResult + (rows.length - rowsPerPage));
  };
  const getPageStart = (pageSize: number, pageNr: number) => {
    return pageSize * pageNr;
  };

  const getPageLabel = (total: number, pageSize: number, pageNr: number) => {
    const start = Math.max(getPageStart(pageSize, pageNr), 0);
    const end = Math.min(getPageStart(pageSize, pageNr + 1), total);
    return `${start + 1} - ${end}`;
  };
  const rows = products?.map(
    (row: { name: string; image: string; availability: number }, i: number) => {
      return createData(
        (rowsPerPage - rowsPerPage) * page + i + 1,
        "22-06-2022",
        "Mia/32FD/35D1/",
        "Aisha Usman",
        "Card",
        "₦ " +
          Number(40900).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          }),
        <ViewReceipt />
      );
    }
  );
  const TOTAL_RESULT = rows?.length;
  const TOTAL_PAGE = Math.ceil(TOTAL_RESULT / rowsPerPage);

  return (
    <div>
      <Head>
        <title>Sales history detail - Maima</title>
        <meta name="description" content="Sales history page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ width: "100%", display: "flex" }}>
        <Goback onClick={() => router.push("/dashboard")}>
          <ArrowBack />
          Dashboard
        </Goback>{" "}
        <Goback onClick={() => router.push("/sales")}>
          <ArrowBack /> Sales
        </Goback>
      </Box>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box
            component="div"
            sx={{
              width: "100%",
              display: "flex",
              mt: { xs: 1, md: 0 },
            }}
          >
            <div className={styles.pageTitleCard}>
              <FormTitle>Sales History</FormTitle>
              <FormSubTitle style={{ marginTop: -10 }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </FormSubTitle>
            </div>
          </Box>
        </Grid>
      </Grid>
      <Box
        component="div"
        sx={{
          width: { xs: "100%", md: "80%" },
          display: "flex",
          flexDirection: "column",
          background: "#FFFFFF 0% 0% no-repeat padding-box",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          flexGrow: 1,
          my: 3,
          padding: "32px 25px",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table stickyHeader sx={{ padding: "8px 10px 8px 0" }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.id}
                      sx={{
                        font: "normal normal 600 12px/20px Poppins",
                        letterSpacing: 0,
                        color: Colors.textColor,
                        borderTop: "1px solid #E5E7EB",
                        padding: "4px 0 4px 0",
                        textAlign: column.align ? column.align : "center",
                        minWidth: column.minWidth ? column.minWidth : 80,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(
                  (
                    row: { name: string; image: string; availability: number },
                    index: number
                  ) => {
                    return (
                      <TableRow key={index + 1}>
                        {columns.map((column) => {
                          const value = row[column.id as keyof typeof row];
                          return (
                            <TableCell
                              key={column.id}
                              sx={{
                                background:
                                  "#FFFFFF 0% 0% no-repeat padding-box",
                                font: `normal normal normal 12px/20px ${Fonts.primary}`,
                                letterSpacing: 0,
                                color: Colors.greyDark,
                                padding: "4px 0 4px 0",
                                textAlign: column.align ? column.align : "left",
                                minWidth: column.minWidth
                                  ? column.minWidth
                                  : 80,
                              }}
                            >
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  }
                )}
            </TableBody>
          </Table>
        </TableContainer>
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
          {getPageLabel(rows?.length, rowsPerPage, page)} of {TOTAL_RESULT}{" "}
          results
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
SalesHistoryPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
