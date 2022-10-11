import {
  Box,
  Grid,
  Pagination,
  Typography,
  Skeleton,
  Stack,
  Button,
  styled,
} from "@mui/material";
import { useSession } from "next-auth/react";
import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "yup-phone";
import { useApi } from "../../hooks/axiosApi";
import PageBanner from "../../src/components/PageBanner";
import PageLoader from "../../src/components/PageLoader";
import usePagination from "../../src/components/usePagination";
import { addToCart } from "../../redux/cart.slice";
import { useDispatch, useSelector } from "../../redux/store";
import Head from "next/head";
import MainLayout from "../../src/components/layouts/MainLayout";
// import { containerPadding } from "../../utils/constants/global/globalStyling";

// const CustomButton = styled(Button)({
//   width: 150,
//   boxShadow: "none",
//   textTransform: "none",
//   font: "normal normal 500 12px/16px Roboto,sans-serif",
//   padding: "16px 12px",
//   border: "1px solid",
//   backgroundColor: "#2651A3",
//   borderColor: "#2651A3",
//   borderRadius: "5px",
//   "&:hover": {
//     backgroundColor: "rgba(38, 81, 163, 0.8)",
//     borderColor: "#2651A3",
//     boxShadow: "none",
//   },
//   "&:active": {
//     backgroundColor: "rgba(38, 81, 163, 0.8)",
//     borderColor: "#2651A3",
//     boxShadow: "none",
//   },
//   "&:focus": {
//     boxShadow: "none",
//   },
// });
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
export default function ConditionsPage() {
  const router = useRouter();
  const pageName = router.query.name;
  const { status } = useSession();
  let [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const PER_PAGE = 6;
  const { data, error, isLoading } = useApi(`${pageName}`);

  const count = Math.ceil(data?.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e: any, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div>
      <Head>
        <title>Conditions - Maima</title>
        <meta name="description" content="conditions page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBanner title={`${pageName} - Shopping Page`} />
      <Box component="div">
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
        <Typography
          variant="h6"
          sx={{
            width: "100%",
            color: "#2651A3",
            font: "normal normal 400 16px/25px Roboto, sans",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          We found {data?.length} products are available for you.
        </Typography>
        <div className="line" />
        <Box
          component="div"
          sx={{
            width: { xs: "100%", md: 600, lg: 800, xl: 920 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "0px auto",
            py: { xs: 2, md: 10 },
          }}
        >
          <Grid container spacing={0}>
            {_DATA.currentData()?.map(
              (
                item: {
                  id: number;
                  src: string;
                  name: string;
                  description: string;
                  price: number;
                },
                idx: number
              ) => (
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} key={idx}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Link href={`/conditions/${pageName}/${item.id}`}>
                        <div
                          style={{
                            width: "100%",
                            background: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <Image
                            src={item.src}
                            alt=""
                            width={200}
                            height={200}
                            layout="fixed"
                          />
                        </div>
                      </Link>
                    </Grid>{" "}
                    <Grid item xs={12}>
                      <Box
                        component="div"
                        sx={{
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          font: "normal normal 500 16px/29px Roboto,sans-serif",
                          color: "#282828",
                        }}
                      >
                        {item.name}
                        <Box
                          component="span"
                          sx={{
                            textAlign: "center",
                            color: "#2651A3",
                            font: "normal normal 500 16px/20px Roboto,sans-serif",
                            mb: 3,
                          }}
                        >
                          {"₦" +
                            item.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                        </Box>
                      </Box>
                      {/* <CustomButton
                          variant="contained"
                          size="medium"
                          disableElevation
                          onClick={() => dispatch(addToCart(data))}
                        >
                          ADD TO CART
                        </CustomButton> */}
                    </Grid>{" "}
                  </Grid>
                </Grid>
              )
            )}
          </Grid>
          <Grid item xs={12}>
            {" "}
            <Box
              component="div"
              sx={{
                margin: "50px 0px",
              }}
            >
              <Pagination
                count={count}
                size="small"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    p: 2,
                    mr: 2,
                    color: "#282828",
                    background: "#ffffff",
                    border: "1px solid #4A91BF",
                  },
                }}
              />
            </Box>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
ConditionsPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
