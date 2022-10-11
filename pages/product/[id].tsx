import {
  Box,
  CircularProgress,
  Grid,
  Rating,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { LoadingButton as Button } from "@mui/lab";
import type { ReactElement } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import NumericInput from "../../src/components/NumericInput";
import PageBanner from "../../src/components/PageBanner";
import { useApi } from "../../hooks/useApi";
import { cartService } from "../../services/cart.service";
import { containerPadding } from "../../utils/constants/global/globalStyling";
import Head from "next/head";
import MainLayout from "../../src/components/layouts/MainLayout";

const styles = {
  spec: {
    mt: 2,
  },
  specTitle: {
    width: 150,
    fontWeight: 500,
  },
  specDescription: {
    color: "rgba(142, 142, 142, 1)",
    mb: 0.5,
  },
  container: {
    ...containerPadding,
    mt: 10,
  },
  containerGrid: {
    mb: { xs: 5, md: 20 },
  },
  productCategoryTitle: {
    color: "rgba(152, 152, 152, 1)",
  },
  productName: {
    color: "rgba(0, 0, 0, 1)",
  },
  rating: {
    mt: 1,
    mb: 3,
  },
  productPrice: {
    color: "rgba(38, 81, 163, 1)",
    mb: 3,
  },
  productDescription: {
    mb: 5,
  },
  qtyTitle: {
    mr: 2,
  },
  addCartBtn: {
    px: 3,
    py: 2,
    backgroundColor: "rgba(38, 81, 163, 1)",
    ":hover": {
      background: "rgba(38, 81, 163, 0.8)",
    },
  },
  table: {
    border: "1px solid rgba(38, 81, 163, 0.3)",
    "& .MuiTableCell-root": {
      px: 5,
      borderBottom: 0,
      fontWeight: 500,
      "&:nth-child(even)": {
        color: "rgba(142, 142, 142, 1)",
      },
    },
    "& .MuiTableRow-root": {
      "&:nth-child(even)": {
        background: "rgba(198, 220, 240, 0.4)",
      },
    },
  },
};

const StyledBox = styled(Box)(({ bg }: { bg: string }) => ({
  height: 450,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "aquamarine",
  backgroundImage: `url(${bg})`,
}));

interface ProductSpecTypes {
  title: string;
  description: string;
}

const ProductSpec = ({ title, description }: ProductSpecTypes) => (
  <Stack direction={"row"} sx={styles.spec}>
    <Typography variant="body2" sx={styles.specTitle}>
      {title}
    </Typography>
    <Typography variant="body2" sx={styles.specDescription}>
      {description}
    </Typography>
  </Stack>
);

export default function ProductPage() {
  const [quantity, setQuantity] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { id = "" } = router.query;
  const { data, isLoading, error } = useApi(
    `${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`
  );

  if (error || data?.status)
    return (
      <Typography
        textAlign="center"
        sx={{
          py: 5,
        }}
      >
        Failed to load product details
      </Typography>
    );
  if (isLoading)
    return (
      <CircularProgress
        color="primary"
        size={50}
        sx={{
          py: 5,
        }}
      />
    );

  const handleCartItemAddition = async () => {
    const params = { quantity, productId: data.id };
    setLoading(true);
    await cartService
      .addToCart(params)
      .then((res) => toast.success("Item added to cart"))
      .catch((err) => toast.error("Failed to add to cart"));
    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Product detail - Maima</title>
        <meta name="description" content="product detail" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={styles.container}>
        <Grid container columnSpacing={5} sx={styles.containerGrid}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <StyledBox
              bg={`${process.env.NEXT_PUBLIC_BASE_API}/${data.images[0]}`}
            ></StyledBox>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Typography variant="caption" sx={styles.productCategoryTitle}>
              Eczema drug
            </Typography>
            <Typography variant="h6" sx={styles.productName}>
              {data.name}
            </Typography>
            <Rating size="small" value={2} sx={styles.rating} />
            <Typography variant="h6" sx={styles.productPrice}>
              ₦ 1,200
            </Typography>
            <Typography variant="body1" sx={styles.productDescription}>
              {data.description}
            </Typography>
            <Stack
              direction={"row"}
              alignItems="center"
              sx={{
                mb: 4,
              }}
            >
              <Typography sx={styles.qtyTitle}>Quantity: </Typography>
              <NumericInput
                value={quantity}
                setValue={setQuantity}
                available=""
              />
            </Stack>
            <Button
              variant="contained"
              size="large"
              disableElevation
              sx={styles.addCartBtn}
              onClick={handleCartItemAddition}
              loading={loading}
            >
              ADD TO CART
            </Button>
            <ProductSpec title="No:" description={data.id} />
            <ProductSpec title="Category:" description={data.type} />
          </Grid>
        </Grid>
        <Box
          sx={{
            mb: 10,
          }}
        >
          <Typography
            sx={{
              color: "rgba(38, 81, 163, 1)",
            }}
            variant="h6"
          >
            Additional Information
          </Typography>
          <Table sx={styles.table}>
            <TableBody>
              {[
                { name: "Category", value: "Medicine" },
                { name: "Quantity", value: 2 },
                { name: "Type of packing", value: "Paper Box" },
                { name: "Expiry Date", value: "27 June 2022" },
              ].map((el) => (
                <TableRow key={el.value}>
                  <TableCell>{el.name}:</TableCell>
                  <TableCell>{el.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </div>
  );
}

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
