import { LoadingButton as Button } from "@mui/lab";
import {
  Box,
  CircularProgress,
  Grid,
  Rating,
  Skeleton,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import type { ReactElement } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { useApi } from "../../../hooks/axiosApi";
import { addToCart } from "../../../redux/cart.slice";
import { useDispatch, useSelector } from "../../../redux/store";
import { cartService } from "../../../services/cart.service";
import MainLayout from "../../../src/components/layouts/MainLayout";
import PageBanner from "../../../src/components/PageBanner";
import RelatedItemsSlider from "../../../src/components/RelatedItems";

const CustomButton = styled(Button)({
  width: 150,
  boxShadow: "none",
  textTransform: "none",
  font: "normal normal 500 12px/16px Roboto,sans-serif",
  padding: "16px 12px",
  border: "1px solid",
  backgroundColor: "#2651A3",
  borderColor: "#2651A3",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "rgba(38, 81, 163, 0.8)",
    borderColor: "#2651A3",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "rgba(38, 81, 163, 0.8)",
    borderColor: "#2651A3",
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "none",
  },
});

const SubNavLoading = () => {
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((el, idx) => (
        <Stack key={idx}>
          <Skeleton
            variant="circular"
            animation="wave"
            width={80}
            height={80}
          />
        </Stack>
      ))}
    </>
  );
};

export default function ProductDetailPage() {
  const [quantity, setQuantity] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  // const { id = "" } = router.query;
  const { name, id } = router.query;
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  //   const { data, isLoading, error } = useApi(
  //     `${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`
  //   );
  const { data, error, isLoading } = useApi(`${name}/${id}`);
  const {
    data: releatedData,
    error: releatedError,
    isLoading: releatedIsLoading,
  } = useApi(`${name}`);

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
        <title>Conditions - Maima</title>
        <meta name="description" content="Conditions detail" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBanner title={`${data?.name} details`} />;
      <Box
        component="div"
        sx={{
          width: { xs: "100%", md: "90%", lg: "95%", xl: "60%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 1, md: 10 },
          m: "0 auto",
        }}
      >
        {isLoading && <SubNavLoading />}
        {error && (
          <Typography
            variant="h6"
            sx={{
              width: "100%",
              color: "#2651A3",
              font: "normal normal normal 25px/29px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            {error}
          </Typography>
        )}
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <div
              style={{
                width: "100%",
                background: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={data?.src}
                alt=""
                width={350}
                height={350}
                layout="fixed"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Typography
              variant="caption"
              sx={{
                color: " #989898",
                font: "normal normal normal 14px/28px Roboto,sans-serif14px/25px Roboto, sans-serif",
                textTransform: "capitalize",
              }}
            >
              {name} drug
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#282828",
                font: "normal normal 500 20px/35px Roboto,sans-serif",
              }}
            >
              {data?.name}
            </Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
                m: "4px 0 24px",
              }}
            >
              <Rating
                size="small"
                value={data?.rating}
                sx={{
                  fontSize: 15,
                  "& .MuiRating-iconEmpty": {
                    color: "#1A1A1A",
                    fill: "#1A1A1A",
                  },
                  "& .MuiRating-iconFilled": {
                    color: "#EF8733",
                  },
                }}
                readOnly
              />
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: "#2651A3",
                font: "normal normal 500 25px/32px Roboto, sans-serif",
                mb: 2,
              }}
            >
              {"₦" +
                data.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                font: "normal normal normal 14px/25px Roboto,sans-serif",
                mb: 5,
              }}
            >
              {data?.description}
            </Typography>
            {/* <Stack
              direction={"row"}
              alignItems="center"
              sx={{
                mb: 4,
              }}
            >
              <Typography
                sx={{
                  font: "normal normal 500 16px/25px Roboto,sans-serif",
                  mr: 2,
                }}
              >
                Quantity:{" "}
              </Typography>
              <NumericInput
                value={quantity}
                setValue={setQuantity}
                available={data?.quantity}
              />
            </Stack> */}
            <CustomButton
              variant="contained"
              size="medium"
              disableElevation
              onClick={() => dispatch(addToCart(data))}
              loading={loading}
            >
              ADD TO CART
            </CustomButton>

            <Box component="div" sx={{ width: "50%", margin: "20px 0" }}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography
                    variant="h6"
                    sx={{
                      font: "normal normal 500 14px/25px Roboto,sans-serif",
                      color: "#282828",
                    }}
                  >
                    No:
                  </Typography>
                </Grid>{" "}
                <Grid item xs={8}>
                  <Typography
                    variant="h6"
                    sx={{
                      font: "normal normal 400 12px/25px Roboto,sans-serif",
                      color: "#8E8E8E",
                    }}
                  >
                    {data.code}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="h6"
                    sx={{
                      font: "normal normal 500 14px/25px Roboto,sans-serif",
                      color: "#282828",
                    }}
                  >
                    Category:
                  </Typography>
                </Grid>{" "}
                <Grid item xs={8}>
                  <Typography
                    variant="h6"
                    sx={{
                      font: "normal normal 400 13px/25px Roboto,sans-serif",
                      color: "#8E8E8E",
                    }}
                  >
                    {data.type}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                m: { xs: "50px 0" },
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  color: "#2651A3",
                  font: "normal normal 500 22px/35px Roboto,sans-serif",
                  mb: 1,
                }}
                variant="h6"
              >
                Additional Information
              </Typography>
              <Table
                sx={{
                  border: "1px solid #2651A34D",
                  "& .MuiTableCell-root": {
                    px: 5,
                    borderBottom: 0,
                    fontWeight: 500,
                    "&:nth-of-type(even)": {
                      color: "rgba(142, 142, 142, 1)",
                    },
                  },
                  "& .MuiTableRow-root": {
                    ":nth-of-type(even)": {
                      background: "rgba(198, 220, 240, 0.4)",
                    },
                  },
                }}
              >
                <TableBody>
                  {[
                    { name: "Category", value: data?.type },
                    { name: "Quantity", value: data?.quantity },
                    { name: "Type of packing", value: data?.package },
                    { name: "Expiry Date", value: data?.expiration },
                  ].map((el, idx) => (
                    <TableRow key={idx}>
                      <TableCell
                        sx={{
                          font: "normal normal 500 14px/25px Roboto,sans-serif",
                          color: "#282828",
                        }}
                      >
                        {el.name}:
                      </TableCell>
                      <TableCell
                        sx={{
                          font: "normal normal 400 13px/25px Roboto,sans-serif",
                          color: "#8E8E8E",
                        }}
                      >
                        {el.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box
              component="div"
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: "20px 100px",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  color: "#282828",
                  font: "normal normal 500 25px/35px Roboto,sans-serif",
                  mb: 3,
                }}
                variant="h6"
              >
                Related Products
              </Typography>
              {releatedIsLoading && <SubNavLoading />}
              {releatedError && (
                <Typography
                  variant="h6"
                  sx={{
                    width: "100%",
                    color: "#2651A3",
                    font: "normal normal normal 25px/29px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px 0",
                  }}
                >
                  {releatedError}
                </Typography>
              )}
              <RelatedItemsSlider sliderimages={releatedData} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

ProductDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
