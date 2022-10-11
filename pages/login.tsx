import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, AlertTitle, Box, Grid, Link, styled } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";
import * as yup from "yup";
import "yup-phone";
import { IloginUser, IregisterUser } from "../features/types";
import { userLogin } from "../redux/auth.slice";
import { useDispatch } from "../redux/store";
import { SubmitButton } from "../src/components/form/buttons";
import { PasswordField, TextField } from "../src/components/form/textFields";
import { Colors } from "../src/components/form/themes/colors";
import MainLayout from "../src/components/layouts/MainLayout";
import PageBanner from "../src/components/PageBanner";
import PageLoader from "../src/components/PageLoader";

const Item = styled(Link)({
  fontSize: "1.1rem",
  fontWeight: 400,
  margin: "0.7rem 0",
  textDecorationLine: "none",
  whiteSpace: "nowrap",
});
const schema = yup.object({
  email: yup.string().email().required().label("email address"),
  password: yup.string().min(6).required().label("password"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IregisterUser>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  // const { data, status } = useSession();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [serverErrors, setServerError] = React.useState<
    string[] | string | null
  >(null);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const onSubmit = async (data: IloginUser) => {
  //   setLoading(true);
  //   signIn("credentials", {
  //     ...data,
  //     callbackUrl: "/",
  //     redirect: false,
  //   })
  //     .then((res: any) => {
  //       toast.success("Login successful");
  //       router.push(res.url);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       toast.error(err.response.data.message);
  //     });
  // };

  const onSubmit = async (data: IloginUser) => {
    setLoading(true);
    dispatch(userLogin({ email: data.email, password: data.password }))
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.success("Login successful");
        router.push("/orders");
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err);
      });
    return false;
  };
  const hasError = (field: keyof IloginUser) => (errors[field] ? true : false);
  // console.log("message", message);
  return (
    <div>
      <Head>
        <title>Login - Maima</title>
        <meta name="description" content="my maima login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBanner title={`Login`} />
      {/* <Box component="div" sx={{ py: { xs: 1, md: 10 } }}>
          <Typography
            variant="h4"
            sx={{
              font: "normal normal 600 20px/35px Roboto, sans-serif",
              color: "#282828",
              textAlign: "center",
            }}
          >
            Welcome to Maima
          </Typography>
          <div className="line" />
          <Typography
            variant="subtitle1"
            sx={{
              font: "normal normal 600 14px/25px Roboto, sans-serif",
              color: "#2651A3",
              textAlign: "center",
              mt: 2,
            }}
          >
            Login to your account to continue
          </Typography>
        </Box> */}
      <Box
        sx={{
          width: { xs: "90%", md: 400 },
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordField
                id="password"
                htmlFor="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                showPassword={showPassword}
                onClick={handleClickShowPassword}
                register={register}
                error={hasError("password")}
                helper={errors.password?.message}
                disabled={isLoading}
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
              <Box
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Item
                  href={"/forgot-password"}
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                    color: "#568089",
                    font: "normal normal 600 14px/10px Roboto, sans-serif",
                    mt: -0.3,
                  }}
                >
                  Forgot your password?
                </Item>
              </Box>
            </Grid>
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
                  "Login"
                )}
              </SubmitButton>
            </Grid>
            <Grid item xs={12}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  mt: { xs: 1, sm: 1, md: 4 },
                  width: "100%",
                  font: "normal normal normal 14px/16px Roboto, sans-serif",
                  color: "rgba(0, 0, 0, 0.63)",
                }}
              >
                Don't have an account?{" "}
                <Link
                  href={"/signup"}
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                    color: "#568089",
                    fontWeight: 400,
                    ml: 0.5,
                  }}
                >
                  Sign up
                </Link>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
  return <PageLoader />;
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
