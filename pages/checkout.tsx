import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Typography,
  Skeleton,
  styled,
  FormHelperText,
} from "@mui/material";
import type { ReactElement } from "react";
import Image from "next/image";
import Check from "@mui/icons-material/Check";
import Radio, { RadioProps } from "@mui/material/Radio";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "yup-phone";
import * as yup from "yup";
import React from "react";
import { useApi } from "../hooks/axiosApi";
import CartTotalTable from "../src/components/cart/CartTotalTable";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import PageBanner from "../src/components/PageBanner";
import { containerPadding } from "../utils/constants/global/globalStyling";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import MainLayout from "../src/components/layouts/MainLayout";

export interface billType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company?: string;
  address?: string;
  note?: string;
}
interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(() => ({
  // ".MuiFormControlLabel-label": {
  //   font: "normal normal 500 16px/30px Roboto, sans-serif",
  // },
  ".MuiFormControlLabel-label": {
    color: "#2651A3",
    font: "normal normal 500 18px/30px Roboto, sans-serif",
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const BpIcon = styled("span")(() => ({
  borderRadius: 30,
  width: 15,
  height: 15,
  boxShadow:
    "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: "#FFF",
  // backgroundImage:
  //   "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto #6979F8",
    outlineOffset: 1,
  },
  "input:hover ~ &": {
    backgroundColor: "#FFF",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  background: "#6979F8",
  // backgroundImage: `url("/images/svgs/check.svg")`,
  // outline: "2px solid #6979F8",
  "&:before": {
    display: "block",
    width: 15,
    height: 15,
    background: `url("/images/svgs/check.svg")`,
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#6979F8",
  },
});

// Inspired by blueprintjs
function BpRadio(props: RadioProps) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    boxSizing: "border-box",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "2px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    color: "rgba(0, 0, 0, 0.63)",
    height: "35px",
    width: "100%",
    margin: "5px 0 12px",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s",
    cursor: "pointer",
    font: `normal normal normal 12px/16px Roboto, sans-serif`,

    "& fieldset": {
      borderColor: "#C4C4C4",
    },
    "&:hover fieldset": {
      borderColor: "#2651A3",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "1px",
      borderColor: "#2651A3",
    },
    "&.Mui-error fieldset": {
      borderWidth: "1px",
      borderColor: "#ED3572",
    },
    "&:hover .Mui-error fieldset": {
      borderColor: "#ED3572",
    },
    "&.Mui-disabled": {
      cursor: "not-allowed",
    },
    "&.Mui-disabled fieldset": {
      borderColor: "#e8ebee",
    },
  },
});
const CustomLabel = styled(InputLabel)({
  font: "normal normal 500 14px/10px Roboto, sans-serif",
  color: "rgba(0, 0, 0, 0.63)",
});
const CustomFormHelperText = styled(InputLabel)({
  font: "normal normal 400 12px/10px Roboto, sans-serif",
  color: "rgba(237,53,114, 0.63)",
  marginTop: -2.5,
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
const CartItem = () => (
  <Stack direction={"row"} alignItems="center" sx={{ mb: 3 }}>
    <IconButton>
      <Image src="/icons/x-square.svg" alt="Delete" height={25} width={25} />
    </IconButton>
    <Box
      sx={{
        height: 120,
        width: 90,
        backgroundColor: "aquamarine",
        mx: 2,
      }}
    ></Box>
    <Typography>Aloevera Supliment</Typography>
  </Stack>
);
const schema = yup
  .object({
    email: yup.string().email().required().label("email address"),
    password: yup.string().min(6).required().label("password"),
  })
  .required();
export default function CheckoutPage() {
  const router = useRouter();
  const { data, error, isLoading } = useApi("cart");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [subtotal, setSubtotal] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);
  const delivery = 500;
  const [serverErrors, setServerError] = React.useState<
    string[] | string | null
  >(null);
  const { status } = useSession();

  React.useEffect(() => {
    const res = [];
    for (let i = 0; i < data?.length; i++) {
      res.push(data[i].price);
    }
    if (res.length !== 0) {
      var total = res.reduce(function (a, b) {
        return a + b;
      });
      setSubtotal(total);
      setTotal(total + delivery);
    }
  }, [data]);
  // React.useEffect(() => {
  //   if (status !== "authenticated") {
  //     router.push("/login");
  //   }
  // }, [status, router]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<billType>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: billType) => {
    // setLoading(true);
    // signIn("credentials", {
    //   ...data,
    //   callbackUrl: "/",
    //   redirect: false,
    // })
    //   .then((res: any) => {
    //     if (res.error) {
    //       toast.error(res.error.message);
    //     }
    //     if (res.ok && !res.error) {
    //       toast.success("Login successful");
    //       router.push(res.url);
    //     } else {
    //       toast.error("Login failed");
    //     }
    //   })
    //   .catch((err) => toast.error("Login failed"));
    // setLoading(false);
  };

  const hasError = (field: keyof billType) => (errors[field] ? true : false);
  return (
    <Box sx={{ width: "100%" }}>
      <Head>
        <title>My Cart - Maima</title>
        <meta name="description" content="my maima checkout page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBanner title="Shopping Cart" />
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

      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "90%", md: "80%", lg: "60%", xl: "60%" },
          borderRadius: "5px",
          py: { xs: 2, md: 3 },
          m: {
            xs: "20px auto",
            md: "80px auto",
          },
          background: "#ffffff 0% 0% no-repeat padding-box",
        }}
      >
        <Grid container columnSpacing={8}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={7}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                font: "normal normal 600 18px/20px SF Pro Text, Poppins, sans-serif",
                color: "#000000",
              }}
            >
              Billing Details
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomLabel>
                    First Name <sup style={{ color: "#ED3572" }}>*</sup>
                  </CustomLabel>
                  <CustomTextField
                    fullWidth
                    size="small"
                    error={hasError("firstName")}
                    inputProps={{
                      ...register("firstName"),
                    }}
                  />
                  {hasError("firstName") && (
                    <CustomFormHelperText error={hasError("firstName")}>
                      {errors.firstName?.message}
                    </CustomFormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomLabel>
                    Last Name <sup style={{ color: "#ED3572" }}>*</sup>
                  </CustomLabel>
                  <CustomTextField
                    fullWidth
                    size="small"
                    error={hasError("lastName")}
                    inputProps={{
                      ...register("lastName"),
                    }}
                  />
                  {hasError("lastName") && (
                    <CustomFormHelperText error={hasError("lastName")}>
                      {errors.lastName?.message}
                    </CustomFormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomLabel>
                    Phone Number <sup style={{ color: "#ED3572" }}>*</sup>
                  </CustomLabel>
                  <CustomTextField
                    fullWidth
                    size="small"
                    error={hasError("phone")}
                    inputProps={{
                      ...register("phone"),
                    }}
                  />
                  {hasError("phone") && (
                    <CustomFormHelperText error={hasError("phone")}>
                      {errors.phone?.message}
                    </CustomFormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <CustomLabel>
                    Email <sup style={{ color: "#ED3572" }}>*</sup>
                  </CustomLabel>
                  <CustomTextField
                    fullWidth
                    size="small"
                    error={hasError("email")}
                    type="email"
                    autoComplete="email"
                    inputProps={{
                      ...register("email"),
                    }}
                  />
                  {hasError("email") && (
                    <CustomFormHelperText error={hasError("email")}>
                      {errors.email?.message}
                    </CustomFormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <CustomLabel>Company Name(Optional)</CustomLabel>
                  <CustomTextField
                    fullWidth
                    size="small"
                    error={hasError("company")}
                    inputProps={{
                      ...register("company"),
                    }}
                  />
                  {hasError("company") && (
                    <CustomFormHelperText error={hasError("company")}>
                      {errors.company?.message}
                    </CustomFormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <CustomLabel>Shipping Address</CustomLabel>
                  <CustomTextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    error={hasError("address")}
                    inputProps={{
                      ...register("address"),
                    }}
                  />
                  {hasError("address") && (
                    <CustomFormHelperText error={hasError("address")}>
                      {errors.address?.message}
                    </CustomFormHelperText>
                  )}
                </Grid>{" "}
                <Grid item xs={12}>
                  <CustomLabel>Order Note</CustomLabel>
                  <CustomTextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    error={hasError("note")}
                    inputProps={{
                      ...register("note"),
                    }}
                  />
                  {hasError("note") && (
                    <CustomFormHelperText error={hasError("note")}>
                      {errors.note?.message}
                    </CustomFormHelperText>
                  )}
                </Grid>
              </Grid>
            </form>
          </Grid>{" "}
          <Grid item xs={12} sm={12} md={4} lg={4} xl={5}>
            {" "}
            <Typography
              variant="h6"
              sx={{
                my: { xs: 3, md: 2 },
                font: "normal normal 600 18px/20px SF Pro Text, Poppins, sans-serif",
                color: "#000000",
              }}
            >
              Your Order
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {data?.map(
                  (
                    item: {
                      id: number;
                      src: string;
                      name: string;
                      available: string;
                      quantity: number;
                      price: number;
                    },
                    idx: number
                  ) => (
                    <Stack
                      alignItems="center"
                      sx={{
                        mb: 3,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                      key={idx}
                    >
                      <div style={{ display: "flex" }}>
                        <Image
                          src={item.src}
                          alt="item in cart"
                          width={72}
                          height={72}
                          layout="fixed"
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            font: "normal normal 500 14px/20px Roboto, sans-serif",
                            color: "#282828",
                            ml: 2,
                            mt: 0.8,
                          }}
                        >
                          {item.name}
                        </Typography>
                      </div>
                      <Button
                        href="/"
                        variant="contained"
                        sx={{
                          width: 80,
                          display: "flex",
                          // m: "12px 0 0 8px",
                          justifyContent: "center",
                          background: "transparent",
                          alignItems: "center",
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
                    </Stack>
                  )
                )}
              </Grid>
            </Grid>
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
                border: "1px solid rgba(0, 0, 0, 0.05)",
                py: { xs: 2, md: 1 },
              }}
            >
              <Box
                sx={{
                  px: 2.5,
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
                      font: "normal normal 500 16px/46px Roboto, sans-serif",
                    }}
                  >
                    Subtotal
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  {" "}
                  <Box
                    sx={{
                      px: { xs: 1, md: 2 },

                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      font: "normal normal 600 16px/46px Roboto, sans-serif",
                      color: "#282828",
                    }}
                  >
                    {"₦" +
                      subtotal.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  {" "}
                  <Box
                    sx={{
                      px: { xs: 1, md: 2 },
                      paddingBottom: 0,
                      color: "#282828",
                      font: "normal normal 500 16px/46px Roboto, sans-serif",
                    }}
                  >
                    Delivery fee{" "}
                    <Box
                      sx={{
                        font: "normal normal 300 12px/20px Roboto, sans-serif",
                        mt: -1,
                        mb: 1,
                      }}
                    >
                      (GiG Logistics)
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  {" "}
                  <Box
                    sx={{
                      px: { xs: 1, md: 2 },

                      display: "flex",

                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      flexDirection: "column",
                      font: "normal normal 600 16px/46px Roboto, sans-serif",
                      color: "#282828",
                    }}
                  >
                    {"₦" +
                      delivery.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <div className="line" />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  {" "}
                  <Box
                    sx={{
                      px: { xs: 1, md: 2 },
                      paddingBottom: 0,
                      color: "#282828",
                      font: "normal normal 500 16px/46px Roboto, sans-serif",
                    }}
                  >
                    Total
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  {" "}
                  <Box
                    sx={{
                      px: { xs: 1, md: 2 },

                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      font: "normal normal 600 16px/46px Roboto, sans-serif",
                      color: "#282828",
                    }}
                  >
                    {"₦" +
                      total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Grid item xs={12}>
              <Box
                component="form"
                sx={{ width: "100%", my: { xs: 3, md: 2 } }}
              >
                <FormControl>
                  <RadioGroup defaultValue="bank" name="radio-buttons-group">
                    <MyFormControlLabel
                      value="bank"
                      control={<BpRadio />}
                      label="Bank Transfer"
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        my: 1,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        font: "normal normal normal 12px/20px Poppins, sans-serif",
                        color: "rgba(0, 0, 0, 0.7)",
                      }}
                    >
                      Make your payment directly into your bank account. Please
                      enter your order ID as a payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      bank.
                    </Typography>
                    <MyFormControlLabel
                      value="cash"
                      control={<BpRadio />}
                      label="Cash on delivery"
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        my: 1,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        font: "normal normal normal 12px/20px Poppins, sans-serif",
                        color: "rgba(0, 0, 0, 0.7)",
                      }}
                    >
                      Cash on delivery. Pay cash when order arrives your door
                      step.
                    </Typography>
                    <MyFormControlLabel
                      value="male"
                      control={<BpRadio />}
                      label="Pay with card or Paypal"
                    />
                    <Image
                      alt="Paypal Intro"
                      src={"/images/paypal-intro.svg"}
                      height={50}
                      width={"100%"}
                      // layout="fixed"
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        my: 1,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        font: "normal normal normal 12px/20px Poppins, sans-serif",
                        color: "rgba(0, 0, 0, 0.7)",
                      }}
                    >
                      Pay via Paypal, you can pay with your credit card if you
                      don’t have a Paypal card.
                    </Typography>
                  </RadioGroup>
                </FormControl>
                <Button
                  size="medium"
                  type="submit"
                  disableElevation
                  sx={{
                    bgcolor: "rgba(38, 81, 163)",
                    color: "#ffffff",
                    boxSizing: "border-box",
                    width: "100%",
                    borderRadius: "5px",
                    mt: 2,
                    p: "10px 12px",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "rgba(38, 81, 163, 0.8)",
                      boxShadow: "none",
                    },
                    "&:active": {
                      backgroundColor: "rgba(38, 81, 163, 0.8)",
                      boxShadow: "none",
                    },
                    "&:focus": {
                      boxShadow: "none",
                    },
                  }}
                >
                  Place order
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
