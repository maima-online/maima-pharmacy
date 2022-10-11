import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import type { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import PageBanner from "../src/components/PageBanner";
import { useApi } from "../hooks/useApi";
import { containerPadding } from "../utils/constants/global/globalStyling";
// import { currencyConverter } from "../../utils/currencyCOnverter";
import { currencyConverter } from "../utils/currencyConverter";
import Head from "next/head";
import MainLayout from "../src/components/layouts/MainLayout";
const toQueryString = (obj: any) =>
  "?".concat(
    Object.keys(obj)
      .map((e) => `${encodeURIComponent(e)}=${encodeURIComponent(obj[e])}`)
      .join("&")
  );

export default function ProductsPage() {
  const router = useRouter();

  const page = Number(router.query?.page ?? 1);

  const query: any = {};
  if (page) {
    query.page = page;
  }
  if (router.query?.name) {
    query.name = router.query.name;
  }

  const { data, isLoading, error } = useApi(
    `${process.env.NEXT_PUBLIC_BASE_API}/products/${toQueryString(query)}`
  );

  const { count = 0, rows = [] } = data || {};

  const limit = 6;

  const pages = count ? Math.ceil(count / limit) : 0;

  if (error) return <div>Failed to load products</div>;
  if (!data) return <CircularProgress color="primary" size={50} />;

  const handlePageChange = (event: any, value: any) => {
    router.push(
      {
        pathname: "/products",
        query: { ...router.query, page: value },
      },
      undefined,
      {}
    );
  };

  return (
    <div>
      <Head>
        <title>Product - Maima</title>
        <meta name="description" content="Products page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBanner title="Shopping Page" />
      <Box sx={{ ...containerPadding, pb: 5 }}>
        <Box sx={{ py: 3, textAlign: "center" }}>
          <Typography variant="caption" color="primary">
            We found {count} products are available for you.
          </Typography>
        </Box>
        <Divider />
        <Grid container columnSpacing={10} rowSpacing={4} sx={{ pt: 5 }}>
          {rows.map(
            (el: {
              name: string;
              id: string;
              price: number;
              currency: string;
              images: string[];
            }) => (
              <Grid item xs={6} sm={6} md={4} lg={4} key={el.id}>
                <Link passHref href={`/product/${el.id}`}>
                  <Card component={"a"} elevation={0}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${process.env.NEXT_PUBLIC_BASE_API}/${el.images[0]}`}
                      alt={el.name}
                    />
                    <CardContent
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="body1"
                        textAlign="center"
                      >
                        {el.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        textAlign="center"
                        sx={{
                          color: "#2651A3",
                        }}
                      >
                        {currencyConverter(el.currency, el.price)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            )
          )}
        </Grid>
        <Stack direction={"row"} justifyContent="center">
          <Pagination
            count={pages}
            disabled={isLoading}
            variant="outlined"
            shape="rounded"
            defaultPage={page}
            onChange={handlePageChange}
          />
        </Stack>
      </Box>
    </div>
  );
}

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
