import {
  Avatar,
  Alert,
  AlertTitle,
  Box,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  styled,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import type { ReactElement } from "react";
import { useEffect } from "react";
import { LoadingButton as Button } from "@mui/lab";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "yup-phone";
import * as yup from "yup";
import PageBanner from "../src/components/PageBanner";
import { containerPadding } from "../utils/constants/global/globalStyling";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useDispatch, useSelector } from "../redux/store";
import { userService } from "../services";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getCookie } from "typescript-cookie";
import { useRouter } from "next/router";
import Head from "next/head";
import MainLayout from "../src/components/layouts/MainLayout";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E5E5E5",
    color: "#7A7A7A",
    font: "normal normal 300 12px/18px Poppins, sans-serif",
    padding: "12px 12px",
  },
  [`&.${tableCellClasses.body}`]: {
    border: 0,
    padding: "16px 16px",
    font: "normal normal 400 14px/16px Roboto, sans-serif",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: "#FFFFFF",

  "&:nth-of-type(even)": {
    backgroundColor: "#F3F3F3",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const columns = [
  {
    id: "date",
    label: "Date",
    align: "left",
  },
  {
    id: "drug",
    label: "Drug",
    align: "left",
  },
  {
    id: "quantity",
    label: "Quantity",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
  },
  {
    id: "amount",
    label: "Amount",
    align: "right",
  },
];

function createData(
  date: string,
  drug: any,
  quantity: number,
  status: any,
  amount: number
) {
  return { date, drug, quantity, status, amount };
}
const drugs = [
  {
    date: "16-Jan-2022",
    drug: "Aloevera Food Supliment",
    image: "/images/aloevera.jpg",
    quantity: 1,
    status: "Processing",
    amount: 1600,
  },
  {
    date: "18-Jan-2022",
    drug: "Digital Infrared Thermometer",
    image: "/images/thermometer.jpg",
    quantity: 2,
    status: "Failed",
    amount: 1450,
  },
  {
    date: "26-Feb-2022",
    drug: "Digital Infrared Thermometer",
    image: "/images/thermometer.jpg",
    quantity: 2,
    status: "Delivered",
    amount: 1450,
  },
  {
    date: "06-March-2022",
    drug: "Aloevera Food Supliment",
    image: "/images/aloevera.jpg",
    quantity: 3,
    status: "Failed",
    amount: 1450,
  },
];

//   [
//   createData("16-Jan-2022", "Aloevera Food Supliment", 1, "Processing", 1600),
//   createData("18-2022", "Digital Infrared Thermometer", 2, "Failed", 1430),
//   createData("26-Jan-2022", "Aloevera Food Supliment", 3, "Delivered", 2160),
//   createData("30-Jan-2022", "Digital Infrared Thermometer", 7, "Failed", 4300),
//   createData("01-Feb-2022", "L-Carnitine", 2, "Delivered", 2000),
// ];
export default function OrdersPage() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (isLoggedIn) return;
  //   router.push("/login");
  // }, [isLoggedIn]);

  const rows = drugs?.map(
    (row: {
      date: string;
      drug: string;
      image: string;
      quantity: number;
      status: string;
      amount: number;
    }) => {
      return createData(
        row.date,
        <Box component="div" sx={{ display: "flex" }}>
          <Box component="span" sx={{ mr: 2 }}>
            <Image src={row.image} alt="drug image" width={25} height={25} />
          </Box>
          {row.drug}
        </Box>,
        row.quantity,
        <Box component="div">
          {" "}
          <Box
            component="span"
            sx={{
              fontSize: 30,
              position: "relative",
              top: 5,
              right: 5,
              mr: 0.5,
              color:
                row.status === "Failed"
                  ? "#FD1F39"
                  : row.status === "Processing"
                  ? "#F19634;"
                  : "#20A93E",
            }}
          >
            &#x2022;
          </Box>
          {row.status}
        </Box>,
        row.amount
      );
    }
  );
  return (
    <div>
      <Head>
        <title>Orders - Maima</title>
        <meta name="description" content="Orders page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBanner title="Orders" />
      <Box
        sx={{
          width: { xs: "90%", md: "80%", lg: "80%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 1, md: 2 },
          m: {
            xs: "20px auto",
            md: "80px auto",
          },
        }}
      >
        <Grid container columnSpacing={3} rowGap={3}>
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <Box sx={{ width: 380 }}>
              <Typography
                variant="h1"
                sx={{
                  font: "normal normal 700 28px/40px Quicksand, sans-serif",
                  color: "#000000",
                }}
              >
                Welcome,
                <span style={{ display: "block" }}>
                  {`${user && user.firstName} ${user && user.lastName} 👋`}
                </span>
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  font: "normal normal 300 12px/30px Poppins, sans-serif",
                  color: "#B4B5B5;",
                }}
              >
                Patient ID: M16xd134
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={2}
            lg={2}
            xl={2}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Box>
              <Avatar
                alt="Remy Sharp"
                src="/images/bamidele.jpeg"
                sx={{ width: 80, height: 80 }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  font: "normal normal 400 12px/50px Poppins, sans-serif",
                  color: "#4A818A;",
                  textAlign: "center",
                }}
              >
                Edit
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: "none", borderRadius: 0 }}
            >
              <Table sx={{ minWidth: 280 }}>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => {
                      return (
                        <StyledTableCell
                          key={column.id}
                          sx={{
                            align: column.align,
                          }}
                        >
                          {column.label}
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => {
                    return (
                      <StyledTableRow key={index + 1}>
                        {columns.map((column) => {
                          const value = row[column.id as keyof typeof row];
                          return (
                            <StyledTableCell
                              key={column.id}
                              component="th"
                              scope="row"
                              sx={{
                                align: column.align,
                              }}
                            >
                              {value}
                            </StyledTableCell>
                          );
                        })}
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
OrdersPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
