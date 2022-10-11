import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MuiPhoneNumber from "material-ui-phone-number";
import { LoadingButton as Button } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Box,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  styled,
} from "@mui/material";
import type { ReactElement } from "react";
import { signIn } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import "yup-phone";
import { userService } from "../services";
import PageBanner from "../src/components/PageBanner";
import { Ilogin } from "../features/types";
import { userLogin, userSignup } from "../redux/auth.slice";
import { useDispatch, useSelector } from "../redux/store";
import { useRouter } from "next/router";
import { TextField, PasswordField } from "../src/components/form/textFields";
import Head from "next/head";
import MainLayout from "../src/components/layouts/MainLayout";
import { SubmitButton } from "../src/components/form/buttons";
import { Bars } from "react-loader-spinner";
import { Colors } from "../src/components/form/themes/colors";

export interface IregisterUser {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  userType?: string;
  passwordConfirmation?: string;
}
const schema = yup
  .object({
    firstName: yup.string().required().label("first name"),
    lastName: yup.string().required().label("last name"),
    phone: yup.string().phone().required().label("phone number"),
    email: yup.string().email().required().label("email address"),
    password: yup.string().min(6).required().label("password"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IregisterUser>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [showpasswordConfirmation, setShowpasswordConfirmation] =
    React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [serverErrors, setServerError] = React.useState<
    string[] | string | null
  >(null);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowpasswordConfirmation = () => {
    setShowpasswordConfirmation(!showpasswordConfirmation);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const login = async (data: Ilogin) => {
    setLoading(true);
    await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/orders",
    });
    setLoading(false);
  };

  const onSubmit = (data: IregisterUser) => {
    data.userType = "user";
    setLoading(true);
    dispatch(userSignup(data))
      .unwrap()
      .then(() => {
        setLoading(false);
        reset();
        return dispatch(
          userLogin({ email: data.email, password: data.password })
        )
          .unwrap()
          .then(() => {
            return router.push("/orders");
          });
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err);
        // setServerError(err);
      });
  };

  const hasError = (field: keyof IregisterUser) =>
    errors[field] ? true : false;
  return (
    <div>
      <Head>
        <title>Signup - Maima</title>
        <meta name="description" content="Signup page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBanner title="User Registration" />
      <Box
        sx={{
          width: { xs: "90%", md: 550 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: "30px 25px",
          m: {
            xs: "20px auto",
            md: "80px auto",
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                error={hasError("firstName")}
                id="firstName"
                htmlFor="firstName"
                name="firstName"
                type="text"
                label="First Name"
                helper={errors.firstName?.message}
                register={register}
                disabled={isLoading}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                error={hasError("lastName")}
                id="lastName"
                htmlFor="lastName"
                name="lastName"
                type="text"
                label="Last Name"
                helper={errors.lastName?.message}
                register={register}
                disabled={isLoading}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                id="phone"
                htmlFor="phone"
                name="phone"
                label={"Phone Number"}
                error={hasError("phone")}
                helper={errors.phone?.message}
                register={register}
                disabled={isLoading}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <PasswordField
                id="passwordConfirmation"
                htmlFor="passwordConfirmation"
                name="passwordConfirmation"
                type={showpasswordConfirmation ? "text" : "password"}
                label="Confirm Password"
                showPassword={showPassword}
                onClick={handleClickShowpasswordConfirmation}
                register={register}
                helper={errors.password?.message}
                disabled={isLoading}
                error={hasError("passwordConfirmation")}
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
              <SubmitButton
                disabled={isLoading}
                // style={{ width: "95%", margin: "0 auto" }}
              >
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
                  "Sign Up"
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
                Already have an account?{" "}
                <Link
                  href={"/login"}
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                    color: "#568089",
                    fontWeight: 400,
                    ml: 0.5,
                  }}
                >
                  Log in
                </Link>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}
SignupPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
