import {
  Box,
  Button,
  Fab,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Skeleton,
  styled,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import type { ReactElement } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import CartTotalTable from "../src/components/cart/CartTotalTable";
import { containerPadding } from "../utils/constants/global/globalStyling";
import CartItems from "../src/components/cart/CartItems";
import { useDispatch, useSelector } from "../redux/store";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cart.slice";
import PageBanner from "../src/components/PageBanner";
import NumericInput from "../src/components/NumericInput";
import { useApi } from "../hooks/axiosApi";
import PageLoader from "../src/components/PageLoader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { height } from "@mui/system";
import MainLayout from "../src/components/layouts/MainLayout";

const styles = {
  checkoutButton: {
    backgroundColor: "rgba(38, 81, 163, 1)",
    color: "#ffffff",
    fontWeight: 400,
    mt: 4,
    px: 4,
    ":hover": {
      backgroundColor: "rgba(38, 81, 163, 0.8)",
    },
  },
  applyButton: {
    height: 40,
    borderRadius: 0,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    background: "rgba(38, 81, 163, 1)",
  },
  continueButton: {
    background: "#384159",
    color: "#ffffff",
    fontWeight: 400,
    ":hover": {
      backgroundColor: "rgba(56, 65, 89, 0.8)",
    },
  },
  updateButton: {
    background: "#2651A3",
    color: "#ffffff",
    fontWeight: 400,
    ml: 2,
    ":hover": {
      backgroundColor: "rgba(38, 81, 163, 0.8)",
    },
  },
};
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
export default function CartPage() {
  // const { data, error, isLoading } = useApi("cart");
  const inputRef = React.useRef(null);
  const [quantity, setQuantity] = React.useState<number>(1);
  const [subtotal, setSubtotal] = React.useState<number>(0);
  const [coupon, setCoupon] = React.useState<string>("");
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce(
      (
        accumulator: number,
        item: {
          id: number;
          src: string;
          name: string;
          available: string;
          quantity: number;
          price: number;
        }
      ) => accumulator + item.quantity * item.price,
      0
    );
  };

  // React.useEffect(() => {
  //   const res = [];
  //   for (let i = 0; i < data?.length; i++) {
  //     res.push(data[i].price);
  //   }
  //   if (res.length !== 0) {
  //     var total = res.reduce(function (a, b) {
  //       return a + b;
  //     });
  //     setSubtotal(total);
  //   }
  // }, [data]);
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const updatedValue = value < 1 ? 1 : value;
    setQuantity(updatedValue);
  };

  const handleIncrement = (id: number) => {
    const updatedValue = quantity + 1;
    setQuantity(updatedValue);
  };

  const handleDecrement = (index: number) => {
    const updatedValue = quantity - 1;
    setQuantity(updatedValue);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
  };
  // const handleUpdateCart = () => {
  //   const res = [];
  //   for (let i = 0; i < data?.length; i++) {
  //     res.push(data[i].price);
  //   }
  //   if (res) {
  //     var total = res.reduce(function (a, b) {
  //       return a + b;
  //     });
  //     setSubtotal(total);
  //   }
  // };
  return (
    <div>
      <Head>
        <title>My Cart - Maima</title>
        <meta name="description" content="My cart details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ width: "100%" }}>
        <PageBanner title="Shopping Cart" />
        {cart?.length === 0 ? (
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "90%", md: "80%", lg: "60%", xl: "50%" },
              borderRadius: "5px",
              py: { xs: 2, md: 3 },
              m: {
                xs: "20px auto",
                md: "80px auto",
              },
              background: "#ffffff 0% 0% no-repeat padding-box",
              boxShadow: "0px 3px 29px #0000000f",
            }}
          >
            <Fab
              sx={{
                boxShadow: "none",
                width: 120,
                height: 120,
                background: "#F5F5F5 0% 0% no-repeat padding-box",
              }}
            >
              <ShoppingCartIcon
                sx={{ width: 70, height: 70, color: "rgba(38, 81, 163)" }}
              />
            </Fab>
            <Typography
              variant="h2"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
                // p: "10px 12px",
                font: "normal normal 600 18px/28px Roboto, sans-serif",
                color: "#282828",
              }}
            >
              Your cart is empty!
            </Typography>
            <Box
              component="p"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
                font: "normal normal normal 12px/20px Roboto, sans-serif",
                color: "#282828",
              }}
            >
              Browse our categories and discover our best deals!
            </Box>
            <Button
              href="/"
              variant="contained"
              sx={{
                bgcolor: "rgba(38, 81, 163)",
                width: 180,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                m: "12px auto",
                p: "10px 12px",
                font: "normal normal 400 14px/20px Roboto, sans-serif",
                color: "#FFFFFF",
                boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
                "&:hover": {
                  bgcolor: "rgba(38, 81, 163)",
                },
              }}
            >
              Start shopping
            </Button>
          </Box>
        ) : (
          <Box
            component="div"
            sx={{
              display: "flex",
              width: {
                xs: "95%",
                md: "90%",
                xl: "70%",
              },
              py: { xs: 2, md: 3 },
              m: {
                xs: "20px auto",
                md: "80px auto",
              },
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    borderRadius: "5px",
                    p: { xs: 2, md: 3 },
                    background: "#ffffff 0% 0% no-repeat padding-box",
                    boxShadow: "0px 3px 29px #0000000f",
                  }}
                >
                  {cart?.map(
                    (
                      item: {
                        id: number;
                        src: string;
                        name: string;
                        available: number;
                        quantity: number;
                        price: number;
                      },
                      idx: number
                    ) => (
                      <Grid container spacing={0} key={idx}>
                        <Grid item xs={3} sm={2} md={1} lg={1} xl={1}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                            }}
                          >
                            <Image
                              src={item.src}
                              alt=""
                              width={72}
                              height={72}
                              layout="fixed"
                            />
                          </div>
                        </Grid>
                        <Grid item xs={6} sm={6} md={8} lg={8} xl={8}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                              font: "normal normal normal 1rem/20px Roboto, sans-serif",
                              color: "#282828",
                              ml: 2,
                            }}
                          >
                            {item.name}
                          </Box>
                        </Grid>
                        <Grid item xs={3} sm={4} md={3} lg={3} xl={3}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                              mb: 2,
                              font: "normal normal 600 1.25rem/20px Roboto, sans-serif",
                              color: "#282828",
                            }}
                          >
                            {"₦" +
                              item.price.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                              })}
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <Button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            variant="contained"
                            sx={{
                              bgcolor: "rgba(38, 81, 163)",
                              width: 80,
                              display: "flex",
                              m: "10px 0 0",
                              justifyContent: "center",
                              alignItems: "center",
                              background: "#FFFFFF",
                              font: "normal normal 600 14px/20px Roboto, sans-serif",
                              color: "rgba(38, 81, 163)",
                              boxShadow: "none",
                              "&:hover": {
                                background: "rgba(38, 81, 163, 0.2)",
                                boxShadow: "none",
                              },
                            }}
                          >
                            Remove
                          </Button>
                        </Grid>{" "}
                        <Grid
                          item
                          xs={6}
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                          }}
                        >
                          <Box
                            component="div"
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                              mb: 1,
                            }}
                          >
                            <Box
                              component="div"
                              sx={{
                                width: 120,
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Button
                                onClick={() =>
                                  dispatch(decrementQuantity(item.id))
                                }
                                sx={{
                                  minWidth: 20,
                                  width: 35,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: 2,
                                  color: "#fff",
                                  p: 0.5,
                                  boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
                                  background:
                                    "rgba(38, 81, 163) 0% 0% no-repeat padding-box",
                                  "&:hover": {
                                    backgroundColor: "rgba(38, 81, 163)",
                                  },
                                }}
                              >
                                <RemoveIcon />
                              </Button>
                              <Box
                                component="span"
                                sx={{
                                  width: 35,
                                  font: "normal normal 500 .875rem/1rem Roboto, sans-serif",
                                  m: 1,
                                  textAlign: "center",
                                }}
                              >
                                {item.quantity}
                              </Box>
                              <Button
                                onClick={() =>
                                  dispatch(incrementQuantity(item.id))
                                }
                                sx={{
                                  minWidth: 20,
                                  width: 35,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: 2,
                                  color: "#fff",
                                  p: 0.5,
                                  boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
                                  background:
                                    "rgba(38, 81, 163) 0% 0% no-repeat padding-box",
                                  "&:hover": {
                                    backgroundColor: "rgba(38, 81, 163)",
                                  },
                                }}
                              >
                                <AddIcon />
                              </Button>
                            </Box>
                          </Box>
                          {/* <NumericInput
                            value={quantity}
                            setValue={setQuantity}
                            available={item.available}
                          /> */}
                          {/* <TextField
                            ref={inputRef}
                            size="small"
                            type="number"
                            id={item.id.toString()}
                            value={quantity}
                            onChange={handleQuantityChange}
                            inputProps={{
                              min: 1,
                              max: Number(item.available),
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <IconButton
                                    disabled={quantity === 1}
                                    onClick={() => handleDecrement(item.id)}
                                  >
                                    −
                                  </IconButton>
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => handleIncrement(item.id)}
                                    disabled={
                                      quantity >= Number(item.available)
                                    }
                                  >
                                    +
                                  </IconButton>
                                </InputAdornment>
                              ),
                              sx: {
                                "& .MuiOutlinedInput-input": {
                                  padding: "10px 24px",
                                  borderRadius: "2px",
                                },
                                "& label.Mui-focused": {
                                  color: "#2651A3",
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottomColor: "#2651A3",
                                },
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: "#2651A3",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#2651A3",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#2651A3",
                                  },
                                },

                                maxWidth: 170,
                                color: "#282828",
                                "input::-webkit-inner-spin-button": {
                                  WebkitAppearance: "none",
                                },
                              },
                            }}
                          /> */}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            mb: 4,
                          }}
                        >
                          <div className="line" />
                        </Grid>
                      </Grid>
                    )
                  )}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        size="small"
                        id="coupon"
                        name="coupon"
                        value={coupon}
                        placeholder="Coupon code"
                        onChange={handleChange}
                        sx={{
                          "& .MuiOutlinedInput-input": {
                            font: "normal normal 400 12px/26px Roboto, sans-serif",
                            padding: "12px 24px",
                            // borderLeftRadius: "2px",
                            // borderRightRadius: "0",
                            borderWidth: 0,
                            outline: "none",
                          },
                          "& label.Mui-focused": {
                            color: "#2651A3",
                          },
                          "& .MuiInput-underline:after": {
                            borderColor: "#2651A3",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#C4C4C4",
                            },
                            "&:hover fieldset": {
                              borderColor: "#2651A3",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#2651A3",
                            },
                          },
                        }}
                      />
                      <Button
                        href="/"
                        variant="contained"
                        sx={{
                          p: "11px 12px",
                          font: "normal normal 400 14px/20px Roboto, sans-serif",
                          color: "#FFFFFF",
                          bgcolor: "rgba(38, 81, 163)",
                          boxShadow: "none",
                          right: 56,
                          top: -1,
                          "&:hover": {
                            bgcolor: "rgba(38, 81, 163)",
                            boxShadow: "none",
                          },
                          "&:active": {
                            bgcolor: "rgba(38, 81, 163)",
                            boxShadow: "none",
                          },
                          "&:focus": {
                            boxShadow: "none",
                          },
                        }}
                      >
                        Apply now
                      </Button>
                    </Grid>{" "}
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <Button
                        href="/"
                        variant="contained"
                        sx={{
                          p: "11px 12px",
                          font: {
                            xs: "normal normal 400 14px/20px Roboto, sans-serif",
                            md: "normal normal 400 12px/18px Roboto, sans-serif",
                          },
                          color: "#FFFFFF",
                          bgcolor: "rgba(38, 81, 163)",
                          boxShadow: "none",
                          "&:hover": {
                            bgcolor: "rgba(38, 81, 163)",
                            boxShadow: "none",
                          },
                        }}
                      >
                        Continue shopping
                      </Button>
                    </Grid>{" "}
                  </Grid>
                </Box>
              </Grid>{" "}
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                    alignItems: "left",
                    width: "100%",
                    borderRadius: "5px",
                    background: "#ffffff 0% 0% no-repeat padding-box",
                    boxShadow: "0px 3px 29px #0000000f",
                  }}
                >
                  <Box
                    sx={{
                      py: { xs: 2, md: 1 },
                      px: { xs: 1, md: 2 },
                      color: "#282828",
                      font: "normal normal 400 14px/26px Roboto, sans-serif",
                      textTransform: "uppercase",
                    }}
                  >
                    Cart summary
                  </Box>
                  <div className="line" />
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      {" "}
                      <Box
                        sx={{
                          px: { xs: 1, md: 2 },
                          paddingBottom: 0,
                          color: "#282828",
                          font: "normal normal 500 16px/26px Roboto, sans-serif",
                        }}
                      >
                        Subtotal
                      </Box>
                    </Grid>{" "}
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      {" "}
                      <Box
                        sx={{
                          px: { xs: 1, md: 2 },

                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                          font: "normal normal 600 1.25rem/20px Roboto, sans-serif",
                          color: "#282828",
                        }}
                      >
                        {"₦" +
                          getTotalPrice().toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        component="p"
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",

                          font: "normal normal 300 14px/16px Roboto, sans-serif",
                          color: "#75757a",
                          px: { xs: 1, md: 2 },
                        }}
                      >
                        Delivery fees not included yet.
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="line" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        href="/checkout"
                        variant="contained"
                        sx={{
                          bgcolor: "rgba(38, 81, 163)",
                          width: "90%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          m: "12px auto",
                          p: "10px 12px",
                          font: "normal normal 400 14px/20px Roboto, sans-serif",
                          color: "#FFFFFF",
                          boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
                          "&:hover": {
                            bgcolor: "rgba(38, 81, 163)",
                          },
                        }}
                      >
                        Proceed to Checkout
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </div>
  );
}

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
