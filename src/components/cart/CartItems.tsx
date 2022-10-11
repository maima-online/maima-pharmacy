import {
  Box,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import NumericInput from "../NumericInput";
import { containerPadding } from "../../../utils/constants/global/globalStyling";

import Swal from "sweetalert2";
import { Title } from "./TableTitle";
import CartItem from "./CartItem";

interface DataProps {
  data: { id: string; product: any; quantity: number }[];
}
function CartItems({ data }: DataProps) {
  return (
    <Box
      sx={{
        mt: 10,
        mb: 4,
        ...containerPadding,
      }}
    >
      <Box
        sx={{
          border: "1px solid rgba(38, 81, 163, 0.3)",
        }}
      >
        <Grid
          container
          // columnSpacing={1}
          sx={{
            py: 2,
            backgroundColor: "rgba(198, 220, 240, 0.4)",
          }}
        >
          <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
          <Grid item xs={3} sm={3} md={3} lg={3}>
            <Title variant="body1">Medicine Name</Title>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Title variant="body1">Total</Title>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Title variant="body1">Quantity</Title>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Title variant="body1">Sub Total</Title>
          </Grid>
        </Grid>
        {data.map((el: { id: string; product: any; quantity: number }) => (
          <CartItem
            {...el}
            key={el.id}
            updateQuantity={(val) =>
              data.map((el: { id: string; product: any; quantity: number }) =>
                el.id === val.id ? { ...el, quantity: el.id } : el
              )
            }
          />
        ))}
      </Box>
    </Box>
  );
}

export default CartItems;
