import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  Typography,
  IconButton,
  InputAdornment,
  styled,
  Link,
} from "@mui/material";
import type { ReactElement } from "react";
import { LoadingButton as Button } from "@mui/lab";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "yup-phone";
import * as yup from "yup";
import PageBanner from "../src/components/PageBanner";
import { TextField } from "../src/components/form/textFields";
import { userService } from "../services";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import PageLoader from "../src/components/PageLoader";
import { IforgotPassword } from "../features/types";
import { forgotPassword } from "../redux/auth.slice";
import { useDispatch } from "../redux/store";
import Head from "next/head";
import MainLayout from "../src/components/layouts/MainLayout";
import { SubmitButton } from "../src/components/form/buttons";
import { Colors } from "../src/components/form/themes/colors";
import { Bars } from "react-loader-spinner";

const Item = styled(Link)({
  color: "#282828",
  fontSize: "1.1rem",
  fontWeight: 400,
  margin: "0.7rem 0",
  textDecorationLine: "none",
  whiteSpace: "nowrap",
});

const schema = yup
  .object({
    email: yup.string().email().required().label("email address"),
  })
  .required();

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IforgotPassword>({
    resolver: yupResolver(schema),
  });
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const [serverErrors, setServerError] = React.useState<
    string[] | string | null
  >(null);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if () {
  //     router.push("/");
  //   }
  // }, [status, router]);

  const onSubmit = async (data: IforgotPassword) => {
    setLoading(true);
    dispatch(forgotPassword({ email: data.email }))
      .then(() => {
        setLoading(false);
        toast.success("Email sent successfully");
        router.push("/login");
        reset();
      })
      .catch((err: any) => {
        toast.error(err);
        setLoading(false);
      });
  };

  const hasError = (field: keyof IforgotPassword) =>
    errors[field] ? true : false;

  return (
    <div>
      <Head>
        <title>Forgot password - Maima</title>
        <meta name="description" content="my maima forgot password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBanner title={` Password assistance`} />
      <Box
        sx={{
          width: { xs: "90%", md: 550 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 1, md: 2 },
          m: {
            xs: "20px auto",
            md: "80px auto",
          },
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            width: "90%",
            m: { xs: "0 auto 16px", md: "16px auto 8px", lg: "0 auto 16px" },
            font: "normal normal 400 14px/25px Roboto, sans-serif",
            color: "#2651A3",
            textAlign: "center",
          }}
        >
          Please enter the e-mail address associated with your Maima account. We
          will send you a link to this e-mail address to reset your password.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="email"
                htmlFor="email"
                name="email"
                type="email"
                label="Email"
                error={hasError("email")}
                helper={errors.email?.message}
                register={register}
                disabled={isLoading}
                required
              />
            </Grid>
            {serverErrors && (
              <Grid item xs={12}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {Array.isArray(serverErrors) ? (
                    <>
                      {serverErrors.map((error, index) => (
                        <li key={error + index}>{error}</li>
                      ))}
                    </>
                  ) : (
                    <p>{JSON.stringify(serverErrors)}</p>
                  )}
                </Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <SubmitButton disabled={isLoading}>
                {isLoading ? (
                  <Bars
                    height="30"
                    width="30"
                    color={Colors.greyLight}
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                ) : (
                  " Send reset instruction"
                )}
              </SubmitButton>

              <Grid item xs={12}>
                <Stack
                  sx={{
                    mt: { xs: 1, sm: 1, md: 4 },
                  }}
                >
                  <Item
                    href={"/login"}
                    underline="hover"
                    sx={{
                      cursor: "pointer",
                      color: Colors.primary,
                      font: "normal normal 600 14px/16px Roboto, sans-serif",
                    }}
                  >
                    Return to login?
                  </Item>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
