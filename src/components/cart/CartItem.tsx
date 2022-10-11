import { Box, Grid, IconButton, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import lodash from "lodash";
import { cartService } from "../../../services";
import { currencyConverter } from "../../../utils/currencyConverter";
import NumericInput from "../NumericInput";
import { Title } from "./TableTitle";

function CartItem({
  id,
  product,
  quantity: initialQuantity,
  updateQuantity = () => {},
}: {
  id: string;
  product: any;
  quantity: number;
  updateQuantity: ({ quantity, id }: { quantity: number; id: string }) => void;
}) {
  const [quantity, setQuantity] = React.useState<number>(initialQuantity);
  const [loading, setLoading] = React.useState(false);

  const updateCartItem = async (value: number) => {
    setLoading(true);
    await cartService
      .updateCartItem(id, { quantity: value })
      .then((res) => {
        toast.success("Cart updated successfully");
        updateQuantity({ id, quantity: value });
      })
      .catch((err) => toast.error("Unable to update cart item"));
    setLoading(false);
  };
  return (
    <Grid
      key={id}
      container
      columnSpacing={1}
      alignItems={"center"}
      sx={{
        py: 2,
      }}
    >
      <Grid item xs={1} sm={1} md={1} lg={1}>
        <Stack justifyContent={"center"} alignItems="center">
          <IconButton
            onClick={() =>
              Swal.fire({
                text: "This will remove this item from cart",
                icon: "warning",
                confirmButtonColor: "#dc3741",
                confirmButtonText: "Delete",
                showCancelButton: true,
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading(),
                preConfirm: () => {
                  return cartService
                    .removeCartItem(id)
                    .then((res) => res.data)
                    .catch((error) => {
                      Swal.showValidationMessage(`Request failed: ${error}`);
                    });
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    "Deleted!",
                    "Item has been deleted from cart",
                    "success"
                  );
                }
              })
            }
          >
            <Image
              src="/icons/x-square.svg"
              alt="Delete"
              height={25}
              width={25}
            />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={3} sm={3} md={3} lg={3}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
          <Box
            sx={{ height: 100, width: 80, backgroundColor: "red", mr: 1 }}
          ></Box>
          <Title variant="body1">{product.name}</Title>
        </Stack>
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2}>
        <Title variant="body1">
          {currencyConverter(product.currency, product.price)}
        </Title>
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <NumericInput
          value={quantity}
          setValue={setQuantity}
          onChange={lodash.throttle(updateCartItem, 1000)}
          available=""
        />
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2}>
        <Title variant="body1">
          {currencyConverter(product.currency, product.price * quantity)}
        </Title>
      </Grid>
    </Grid>
  );
}

export default CartItem;
