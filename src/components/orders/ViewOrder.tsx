import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
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
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { Controller, useController, useForm } from "react-hook-form";
import * as yup from "yup";
import { useApi } from "../../../hooks/axiosApi";
import styles from "../../../styles/Inventory.module.css";
import { CancelButton, SubmitButton } from "../form/buttons";
import { ButtonsRow } from "../form/buttons/styles";

import { FormTitle, InputLabel } from "../form/textFields/styles";
import { Colors } from "../form/themes/colors";
import { Fonts } from "../form/themes/fonts";
import { AddIcon } from "../svgs";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const columns = [
  {
    id: "product",
    label: "Name of Drugs",
    minWidth: 80,
    align: "left",
  },
  {
    id: "amount",
    label: "Amount  (₦)",
    minWidth: 80,
    align: "left",
  },
  {
    id: "quantity",
    label: "quantity",
    minWidth: 20,
    align: "left",
  },
  {
    id: "totalAmount",
    label: "Total (₦)",
    minWidth: 80,
    align: "right",
  },
];
function createData(
  product: string,
  amount: string,
  quantity: number,
  totalAmount: string
) {
  return { product, amount, quantity, totalAmount };
}

export default function ViewOrders() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { data: orders, error, isLoading } = useApi("customer-orders");

  const handleClickOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  // const handleButtonClick = (buttonName: string) => {
  // console.log("status", buttonName);
  // };
  const rows = orders?.map(
    (row: { drug: string; amount: string; quantity: number }) => {
      let total: any = row.quantity * Number(row.amount);
      return createData(
        row.drug,
        "₦ " +
          Number(row.amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          }),
        row.quantity,
        "₦ " +
          Number(total).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })
      );
    }
  );
  return (
    <div>
      <SubmitButton
        onClick={handleClickOpen}
        style={{ width: 120, textTransform: "uppercase" }}
        ghost
      >
        View Orders
      </SubmitButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            width: { xs: "100%", lg: 700 },
            maxWidth: { xs: "100%", lg: 700 },
          },
        }}
      >
        <Box
          component="div"
          sx={{
            fontFamily: Fonts.primary,
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "24px",
            color: Colors.textColor,
            padding: 3,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: Colors.greyDark,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="div"
            sx={{
              width: "100%",
              display: "flex",
            }}
          >
            <Grid container columnSpacing={1}>
              <Grid item xs={12} md={3}>
                <FormTitle
                  style={{
                    font: ` normal normal 600 16px/18px ${Fonts.primary}`,
                  }}
                >
                  Musa Garba
                </FormTitle>
                <Box
                  sx={{
                    display: "flex",
                    width: 130,
                    height: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    border: `1px dashed ${Colors.borderColor}`,
                    borderRadius: "8px",
                    mb: 1.4,
                  }}
                >
                  profile picture
                </Box>
                <SubmitButton
                  ghost
                  style={{ width: 130 }}
                  onClick={() => router.push("/user-management")}
                >
                  View user profile
                </SubmitButton>
              </Grid>
              <Grid item xs={12} md={9}>
                <Box
                  component="div"
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    borderRadius: "8px",
                    flexGrow: 1,
                    mt: 3,
                    // px: 3,
                  }}
                >
                  <FormTitle
                    style={{
                      font: ` normal normal 600 14px/18px ${Fonts.primary}`,
                    }}
                  >
                    Customer order
                  </FormTitle>
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
                                  textAlign: column.align
                                    ? column.align
                                    : "center",
                                  minWidth: column.minWidth
                                    ? column.minWidth
                                    : 80,
                                }}
                              >
                                {column.label}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows?.map(
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
                                  const value =
                                    row[column.id as keyof typeof row];
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
                                        textAlign: column.align
                                          ? column.align
                                          : "left",
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
                    <Grid container>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            width: { xs: "100%" },
                            display: "flex",
                            font: `normal normal 600 14px/24px ${Fonts.primary}`,
                            color: Colors.greyDark,
                          }}
                        >
                          Total
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            width: { xs: "100%" },
                            display: "flex",
                            justifyContent: "flex-end",

                            font: `normal normal 600 24px/36px ${Fonts.primary}`,
                            color: Colors.greyDark,
                          }}
                        >
                          ₦1,345.00
                        </Box>
                      </Grid>
                    </Grid>
                  </TableContainer>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <ButtonsRow
                  style={{
                    margin: "30px 0 8px 4px",
                    justifyContent: "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      font: ` normal normal 600 14px/18px ${Fonts.primary}`,
                      color: Colors.primary,
                      mr: { xs: 0, lg: 10 },
                    }}
                  >
                    Pending
                  </Box>
                  <SubmitButton
                    // onClick={handleButtonClick("Delivered")}
                    style={{ width: 90, textTransform: "uppercase" }}
                    ghost
                  >
                    Delivered
                  </SubmitButton>
                  <SubmitButton
                    // onClick={handleButtonClick("Failed")}
                    style={{
                      width: 80,
                      textTransform: "uppercase",
                      marginTop: 0,
                    }}
                    ghost
                  >
                    Failed
                  </SubmitButton>
                </ButtonsRow>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
