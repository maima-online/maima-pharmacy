import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GridViewIcon from "@mui/icons-material/GridView";
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
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEventHandler, ReactElement, useState } from "react";
import { useApi } from "../../hooks/axiosApi";
import AdminDashboardLayout from "../../src/components/AdminLayout";
import { SubmitButton } from "../../src/components/form/buttons";
import { ButtonsRow } from "../../src/components/form/buttons/styles";
import { OutlinedSearch } from "../../src/components/form/textFields";
import {
  FormSubTitle,
  FormTitle,
  Goback,
} from "../../src/components/form/textFields/styles";
import { Colors } from "../../src/components/form/themes/colors";
import { Fonts } from "../../src/components/form/themes/fonts";
import ViewOrders from "../../src/components/orders/ViewOrder";
import UpdatePurchase from "../../src/components/purchases/UpdatePurchase";
import { ArrowBack, FilterButton, TableIcon } from "../../src/components/svgs";
import styles from "../../styles/Inventory.module.css";

export interface RowProps {
  name: string;
  image: string;
  availability: number;
  purchased: boolean;
}

const columns = [
  {
    id: "serial",
    label: "S/N",
    minWidth: 20,
    align: "left",
  },
  {
    id: "user",
    label: "User",
    minWidth: 180,
    align: "center",
  },
  {
    id: "totalItem",
    label: "Total Item",
    minWidth: 70,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 200,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 80,
    align: "left",
  },
];
function createData(
  serial: number,
  user: string,
  totalItem: number,
  status: ReactElement,
  amount: number,
  action: any
) {
  return { serial, user, totalItem, status, amount, action };
}

export default function UserManagementsPage() {
  const router = useRouter();
  const { data: orders, error, isLoading } = useApi("orders");
  const [page, setPage] = useState(0);
  const [serialNumber, setSerialNumber] = useState(0);
  const [subResult, setSubResult] = useState(10);
  const [search, setSearch] = useState("");
  const rowsPerPage = 10;

  const handleChangePageBack = () => {
    page > 1 ? setPage(page - 1) : setPage(0);
    setSerialNumber(serialNumber - rowsPerPage);
    setSubResult(subResult - rowsPerPage);
  };
  const handleChangePageForward = () => {
    page < TOTAL_PAGE ? setPage(page + 1) : setPage(TOTAL_PAGE);
    setSerialNumber(serialNumber + rowsPerPage);
    setSubResult(subResult + (rows?.length - rowsPerPage));
  };
  const getPageStart = (pageSize: number, pageNr: number) => {
    return pageSize * pageNr;
  };

  const getPageLabel = (total: number, pageSize: number, pageNr: number) => {
    const start = Math.max(getPageStart(pageSize, pageNr), 0);
    const end = Math.min(getPageStart(pageSize, pageNr + 1), total);
    return `${start + 1} - ${end}`;
  };
  const handleButtonClick = (
    row: {
      id: number;
      user: string;
      items: number;
      status: string;
      amount: number;
      action: any;
    },
    buttonName: string
  ) => {
    console.log("status", row.status, buttonName);
  };
  const rows = orders?.map(
    (
      row: {
        id: number;
        user: string;
        items: number;
        status: string;
        amount: number;
        action: any;
      },
      i: number
    ) => {
      return createData(
        (rowsPerPage - rowsPerPage) * page + i + 1,
        row.user,
        row.items,
        <Box
          sx={{
            textTransform: "capitalize",
            font: `normal normal 400 12px/20px ${Fonts.primary}`,
            color:
              row.status === "delivered"
                ? "#068D14"
                : row.status === "failed"
                ? Colors.error
                : Colors.primary,
          }}
        >
          {row.status}
        </Box>,
        row.amount,
        row.status === "delivered" ? (
          <ButtonsRow
            style={{ margin: "8px 0 8px 4px", justifyContent: "flex-start" }}
          >
            <ViewOrders />
          </ButtonsRow>
        ) : row.status === "failed" ? (
          <ButtonsRow
            style={{ margin: "8px 0 8px 4px", justifyContent: "flex-start" }}
          >
            <ViewOrders />
          </ButtonsRow>
        ) : (
          <ButtonsRow
            style={{ margin: "8px 0 8px 4px", justifyContent: "flex-start" }}
          >
            <ViewOrders />
            <SubmitButton
              onClick={() => handleButtonClick(row, "Delivered")}
              style={{ width: 90, textTransform: "uppercase" }}
              ghost
            >
              Delivered
            </SubmitButton>
            <SubmitButton
              onClick={() => handleButtonClick(row, "Failed")}
              style={{ width: 80, textTransform: "uppercase", marginTop: 0 }}
              ghost
            >
              Failed
            </SubmitButton>
          </ButtonsRow>
        )
      );
    }
  );
  const TOTAL_RESULT = rows?.length;
  const TOTAL_PAGE = Math.ceil(TOTAL_RESULT / rowsPerPage);

  return (
    <div>
      <Head>
        <title>Purchase detail - Maima</title>
        <meta name="description" content="Inventory Product page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={6}>
          <Goback onClick={() => router.push("/dashboard")}>
            <ArrowBack /> Back to dashboard
          </Goback>
        </Grid>
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
              <FormTitle>Prescription</FormTitle>
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
          width: { xs: "100%", md: "70%" },
          m: "0 auto",
          display: "flex",
          flexDirection: "column",
          background: "#FFFFFF 0% 0% no-repeat padding-box",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          flexGrow: 1,
          my: 2,
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
                        padding: "14px 0 14px 0",
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
                    row: {
                      name: string;
                      image: string;
                      availability: number;
                    },
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
              sx={{ width: "25%", display: "flex", position: "relative" }}
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
                <IconButton
                  onClick={handleChangePageBack}
                  disabled={page === 0}
                >
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
        </TableContainer>
      </Box>
    </div>
  );
}
UserManagementsPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
