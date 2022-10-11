import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

interface CartTotalTableTypes {
  width?: string | object;
  data: [any];
}

const TableTitle = styled(Typography)({
  fontWeight: 500,
  fontSize: "1rem",
  color: "#282828",
});

const TableItemPrice = styled(Typography)({
  fontWeight: 500,
  fontSize: "0.8rem",
  color: "rgba(38, 81, 163, 1)",
});

const TableItemDescription = styled(Typography)({
  fontWeight: 500,
  fontSize: "0.6rem",
  color: "rgba(0, 0, 0, 0.5)",
});

function CartTotalTable({ width, data }: CartTotalTableTypes) {
  // console.log({ data });
  return (
    <Table
      sx={{
        width: width || { xs: "100%", md: 500 },
        mt: 5,
        border: "1px solid rgba(38, 81, 163, 0.3)",
        "& .MuiTableCell-root": {
          borderBottom: 0,
          px: 6,
        },
      }}
    >
      <TableHead
        sx={{
          backgroundColor: "rgba(198, 220, 240, 0.4)",
        }}
      >
        <TableRow>
          <TableCell>
            <TableTitle>Total Cost</TableTitle>
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <TableTitle>Sub total</TableTitle>
          </TableCell>
          <TableCell
            sx={{
              textAlign: "right",
            }}
          >
            <TableItemPrice>
              ₦{" "}
              {/* {data.reduce(
                (previousValue, currentValue) =>
                  previousValue +
                  currentValue.quantity * currentValue.product.price,
                0
              )} */}
            </TableItemPrice>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <TableTitle>Delivery</TableTitle>
          </TableCell>
          <TableCell
            sx={{
              textAlign: "right",
            }}
          >
            <TableItemPrice>₦ 5000</TableItemPrice>
            <TableItemDescription>GIG Logistics</TableItemDescription>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter
        sx={{
          borderTop: "1px solid rgba(38, 81, 163, 0.3)",
          mt: 5,
          pt: 5,
        }}
      >
        <TableRow>
          <TableCell>
            <TableTitle>Sub total</TableTitle>
          </TableCell>
          <TableCell
            sx={{
              textAlign: "right",
            }}
          >
            <TableItemPrice>₦ 5000</TableItemPrice>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default CartTotalTable;
