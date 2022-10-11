import Add from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GridViewIcon from "@mui/icons-material/GridView";
import Remove from "@mui/icons-material/Remove";
import {
  Divider,
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
import React, { ReactElement, useState } from "react";
import { useApi } from "../../hooks/axiosApi";
import AdminDashboardLayout from "../../src/components/AdminLayout";
import { SubmitButton } from "../../src/components/form/buttons";
import { OutlinedSearch } from "../../src/components/form/textFields";
import {
  FormSubTitle,
  FormTitle,
  Goback,
} from "../../src/components/form/textFields/styles";
import { Colors } from "../../src/components/form/themes/colors";
import { Fonts } from "../../src/components/form/themes/fonts";
import AddPaymentMethod from "../../src/components/Sales/PaymentMethod";
// import PaymentSuccess from "../../src/components/Sales/PaymentSuccess";
import { ArrowBack } from "../../src/components/svgs";
import styles from "../../styles/Inventory.module.css";

export default function SalesPage() {
  const router = useRouter();
  const { data: products, error, isLoading } = useApi("products");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 21;
  const [serialNumber, setSerialNumber] = useState(0);
  const [subResult, setSubResult] = useState(10);

  const handleChangePageBack = () => {
    page > 1 ? setPage(page - 1) : setPage(0);
    setSerialNumber(serialNumber - rowsPerPage);
    setSubResult(subResult - rowsPerPage);
  };
  const handleChangePageForward = () => {
    page < TOTAL_PAGE ? setPage(page + 1) : setPage(TOTAL_PAGE);
    setSerialNumber(serialNumber + rowsPerPage);
    setSubResult(subResult + (products.length - rowsPerPage));
  };
  const getPageStart = (pageSize: number, pageNr: number) => {
    return pageSize * pageNr;
  };

  const getPageLabel = (total: number, pageSize: number, pageNr: number) => {
    const start = Math.max(getPageStart(pageSize, pageNr), 0);
    const end = Math.min(getPageStart(pageSize, pageNr + 1), total);
    return `${start + 1} - ${end}`;
  };
  const TOTAL_RESULT = products?.length;
  const TOTAL_PAGE = Math.ceil(TOTAL_RESULT / rowsPerPage);

  return (
    <div>
      <Head>
        <title>Purchase detail - Maima</title>
        <meta name="description" content="Inventory Product page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <Goback onClick={() => router.push("/dashboard")}>
            <ArrowBack /> Back to dashboard
          </Goback>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <SubmitButton
              ghost
              onClick={() => router.push("/sales/history")}
              style={{ width: 120 }}
            >
              View history
            </SubmitButton>
          </Box>
        </Grid>
      </Grid>
      <Grid container columnSpacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="div"
            sx={{
              width: "100%",
              display: "flex",
              mt: { xs: 1, md: 0 },
            }}
          >
            <div className={styles.pageTitleCard}>
              <FormTitle>Point of Sale</FormTitle>
              <FormSubTitle style={{ marginTop: "-16px !important" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </FormSubTitle>
            </div>
          </Box>
          {/* <PaymentSuccess /> */}
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 1,
              p: "10px 20px",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
            }}
          >
            <FormTitle>Order #2414</FormTitle>
            <FormSubTitle>29 September 2022, 23:01</FormSubTitle>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "cennter",
                    font: `normal normal 400 12px/20px ${Fonts.primary}`,
                    color: Colors.textColor,
                    "& svg": {
                      m: 1.5,
                    },
                    "& hr": {
                      mx: 2,
                      flex: "auto",
                    },
                  }}
                >
                  <Box>
                    Email
                    <Box
                      component="span"
                      sx={{
                        width: "100%",
                        display: "block",
                        color: Colors.greyDark,
                      }}
                    >
                      sales@maimaonline.com
                    </Box>
                  </Box>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ borderColor: "#E5E7EB" }}
                  />
                </Box>
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "cennter",
                    font: `normal normal 400 12px/20px ${Fonts.primary}`,
                    color: Colors.textColor,
                    "& svg": {
                      m: 1.5,
                    },
                    "& hr": {
                      mx: 2,
                      flex: "auto",
                    },
                  }}
                >
                  <Box>
                    Phone
                    <Box
                      component="span"
                      sx={{ display: "block", color: Colors.greyDark }}
                    >
                      +234814245678
                    </Box>
                  </Box>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ borderColor: "#E5E7EB" }}
                  />
                </Box>
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "cennter",
                    font: `normal normal 400 12px/20px ${Fonts.primary}`,
                    color: Colors.textColor,
                    "& svg": {
                      m: 1.5,
                    },
                    "& hr": {
                      mx: 2,
                      flex: "auto",
                    },
                  }}
                >
                  <Box>
                    Payment
                    <Box
                      component="span"
                      sx={{ display: "block", color: Colors.greyDark }}
                    >
                      Card
                    </Box>
                  </Box>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ borderColor: "#E5E7EB" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "cennter",
                    font: `normal normal 400 12px/20px ${Fonts.primary}`,
                    color: Colors.textColor,
                    "& svg": {
                      m: 1.5,
                    },
                    "& hr": {
                      mx: 2,
                    },
                  }}
                >
                  served by
                  <Box
                    component="span"
                    sx={{ display: "block", color: Colors.greyDark }}
                  >
                    Aishia
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12}>
            <Box
              component="div"
              sx={{
                // display: "flex",
                p: "10px 20px",
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                mt: 2,
              }}
            >
              <FormTitle>Summary</FormTitle>
              <Box
                component="div"
                sx={{
                  display: "flex",
                }}
              >
                <Grid container rowSpacing={2}>
                  <Grid item xs={12} sm={8}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        font: `normal normal 400 12px/20px ${Fonts.primary}`,
                        color: Colors.greyDark,
                      }}
                    >
                      <Image
                        src="/images/aloevera.jpg"
                        alt="sale image"
                        width={40}
                        height={40}
                        layout="fixed"
                      />
                      <Box sx={{ ml: 1 }}>
                        Classic Bathrobe (Carmel)
                        <Box
                          component="span"
                          sx={{ display: "block", color: Colors.textColor }}
                        >
                          Large
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      sx={{
                        width: { xs: "100%" },
                        display: "flex",
                        justifyContent: { xs: "flex-end", sm: "space-between" },
                        alignItems: "flex-end",
                        font: `normal normal 400 12px/20px ${Fonts.primary}`,
                        color: Colors.greyDark,
                      }}
                    >
                      ₦1,345.00 x 1<Box component="span">₦1,345.00</Box>
                    </Box>
                  </Grid>{" "}
                  <Grid item xs={12} sm={8}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        font: `normal normal 400 12px/20px ${Fonts.primary}`,
                        color: Colors.greyDark,
                      }}
                    >
                      <Image
                        src="/images/mask.jpg"
                        alt="sale image"
                        width={40}
                        height={40}
                        layout="fixed"
                      />
                      <Box sx={{ ml: 1 }}>
                        Towels (Coastal Stripes)
                        <Box
                          component="span"
                          sx={{ display: "block", color: Colors.textColor }}
                        >
                          Bath Towel
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: { xs: "flex-end", sm: "space-between" },
                        alignItems: "flex-end",
                        font: `normal normal 400 12px/20px ${Fonts.primary}`,
                        color: Colors.greyDark,
                      }}
                    >
                      ₦1,345.00 x 1<Box component="span">₦1,345.00</Box>
                    </Box>
                  </Grid>{" "}
                  <Grid item xs={12} sm={8}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        font: `normal normal 400 12px/20px ${Fonts.primary}`,
                        color: Colors.greyDark,
                      }}
                    >
                      <Image
                        src="/images/pot.jpg"
                        alt="sale image"
                        width={40}
                        height={40}
                        layout="fixed"
                      />
                      <Box sx={{ ml: 1 }}>
                        Linen Bedspread (Sand Grey)
                        <Box
                          component="span"
                          sx={{ display: "block", color: Colors.textColor }}
                        >
                          240x260
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: { xs: "flex-end", sm: "space-between" },
                        alignItems: "flex-end",
                        font: `normal normal 400 12px/20px ${Fonts.primary}`,
                        color: Colors.greyDark,
                      }}
                    >
                      ₦1,345.00 x 1<Box component="span">₦1,345.00</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        width: { xs: "100%", sm: 190 },
                        display: "flex",
                        justifyContent: "space-between",
                        font: `normal normal 400 12px/20px ${Fonts.primary}`,
                        color: Colors.greyDark,
                      }}
                    >
                      Subtotal
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        width: { xs: "100%" },
                        display: "flex",
                        justifyContent: "flex-end",

                        font: `normal normal 400 12px/20px ${Fonts.primary}`,
                        color: Colors.greyDark,
                      }}
                    >
                      ₦1,345.00
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        width: { xs: "100%", sm: 190 },
                        display: "flex",
                        font: `normal normal 400 12px/20px ${Fonts.primary}`,
                        color: Colors.greyDark,
                      }}
                    >
                      Discount:
                      <Box
                        component="span"
                        sx={{
                          ml: 1,
                          background: "#F3F4F6",
                          borderRadius: "8px",
                          py: 0.2,
                          px: 1,
                        }}
                      >
                        SUMMER20
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        width: { xs: "100%" },
                        display: "flex",
                        justifyContent: "flex-end",

                        font: `normal normal 400 12px/20px ${Fonts.primary}`,
                        color: Colors.greyDark,
                      }}
                    >
                      ₦1,345.00
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        width: { xs: "100%", sm: 190 },
                        display: "flex",
                        font: `normal normal 400 12px/20px ${Fonts.primary}`,
                        color: Colors.greyDark,
                      }}
                    >
                      Tax @ 12,5%
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        width: { xs: "100%" },
                        display: "flex",
                        justifyContent: "flex-end",

                        font: `normal normal 400 12px/20px ${Fonts.primary}`,
                        color: Colors.greyDark,
                      }}
                    >
                      ₦1,345.00
                    </Box>
                  </Grid>{" "}
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
              </Box>
            </Box>
            <Grid item xs={12}>
              <AddPaymentMethod />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 1,
              p: "10px 20px",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
            }}
          >
            <Grid container>
              <Grid item xs={12} md={8}>
                <FormTitle>Products</FormTitle>
              </Grid>

              <Grid item xs={12} md={4}>
                <OutlinedSearch
                  id="search"
                  name="search"
                  value={search}
                  placeholder="Search by name of product"
                  borderBottom={false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
                  }
                  ghost
                />
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Divider sx={{ borderColor: "#E5E7EB", borderWidth: 1.2 }} />
                </Grid>
                {products
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(
                    (
                      product: {
                        image: string;
                        name: string;
                        price: number;
                        availability: number;
                      },
                      i: number
                    ) => (
                      <Grid item xs={6} sm={6} md={4} key={i}>
                        <Box
                          sx={{
                            display: "flex",
                            font: `normal normal 400 16px/20px ${Fonts.primary}`,
                            color: Colors.greyDark,
                            mt: 2,
                          }}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={50}
                            height={50}
                            layout="fixed"
                          />
                          <Box sx={{ ml: 1 }}>
                            {product.name}{" "}
                            <Box
                              sx={{
                                display: "block",
                                font: `normal normal 600 14px/20px ${Fonts.primary}`,
                              }}
                            >
                              {"₦" +
                                Number(product.price).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}
                            </Box>
                          </Box>
                        </Box>
                        <Divider
                          sx={{
                            borderColor: "#E5E7EB",
                            borderWidth: 1.5,
                            mt: 2,
                          }}
                        />
                      </Grid>
                    )
                  )}
              </Grid>
              <Grid item xs={12}>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1,
                    mt: 1.5,
                    font: `normal normal 400 12px/20px ${Fonts.primary}`,
                    color: "#6B7280",
                  }}
                >
                  <Box component="div" sx={{ width: "100%" }}>
                    {getPageLabel(products?.length, rowsPerPage, page)} of{" "}
                    {TOTAL_RESULT} results
                  </Box>
                  <Box
                    component="div"
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    {page + 1} of {TOTAL_PAGE}
                    <Box
                      component="span"
                      sx={{
                        display: "flex",
                        // position: "relative",
                      }}
                    >
                      <IconButton
                        onClick={handleChangePageBack}
                        disabled={page === 0}
                      >
                        <ArrowBackIcon
                          sx={{ fontSize: "18px", cursor: "pointer" }}
                        />
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
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
SalesPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
