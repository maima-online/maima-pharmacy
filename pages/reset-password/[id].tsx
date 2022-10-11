import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  AlertTitle,
  Box,
  Grid,
  Link,
  Stack,
  styled,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";
import * as yup from "yup";
import "yup-phone";
import { resetPassword } from "../../redux/auth.slice";
import { useDispatch } from "../../redux/store";
import { SubmitButton } from "../../src/components/form/buttons";
import { PasswordField } from "../../src/components/form/textFields";
import { Colors } from "../../src/components/form/themes/colors";
import MainLayout from "../../src/components/layouts/MainLayout";
import PageBanner from "../../src/components/PageBanner";

const Item = styled(Link)({
  fontSize: "1.1rem",
  fontWeight: 400,
  margin: "0.7rem 0",
  textDecorationLine: "none",
  whiteSpace: "nowrap",
});

interface Ipassword {
  password: string;
  passwordConfirmation?: string;
}
const schema = yup
  .object({
    password: yup.string().min(6).required().label("password"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Ipassword>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const {
    query: { id },
  } = router;

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
    return event.preventDefault();
  };

  const onSubmit = async (data: Ipassword) => {
    setLoading(true);
    dispatch(resetPassword({ token: id, password: data.password }))
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.success("Password changed successfully");
        router.push("/login");
        reset();
      })
      .catch((err: any) => {
        toast.error(err);
        setLoading(false);
      });
  };
  const hasError = (field: keyof Ipassword) => (errors[field] ? true : false);
  return (
    <div>
      <Head>
        <title>Reset password - Maima</title>
        <meta name="description" content="Reset password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBanner title="Password Reset" />
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
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
                required
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordField
                id="passwordConfirmation"
                htmlFor="passwordConfirmation"
                name="passwordConfirmation"
                type={showpasswordConfirmation ? "text" : "password"}
                label="Confirm password"
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
                  "Save"
                )}
              </SubmitButton>
            </Grid>
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
        </form>
      </Box>
    </div>
  );
}
ResetPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
