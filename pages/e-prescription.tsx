import {
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  TextField,
  Typography,
  styled,
  FormHelperText,
} from "@mui/material";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import FileInput from "../src/components/FileInput";
import PageBanner from "../src/components/PageBanner";
import { containerPadding } from "../utils/constants/global/globalStyling";
import Head from "next/head";
import MainLayout from "../src/components/layouts/MainLayout";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-input": { padding: "10px 24px", borderRadius: "2px" },
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
});
const CustomLabel = styled(InputLabel)({
  font: "normal normal 500 14px/24px Roboto, sans-serif",
  color: "rgba(0, 0, 0, 0.63)",
});
export interface prescriptionUpload {
  patientID: string;
  hospitalName: string;
  drugName: string;
  dosage: string;
  fileupload: string;
  additionalInfo?: string;
}
const schema = yup
  .object({
    patientID: yup
      .string()
      .required()
      .label("Patient identification number is required"),
    hospitalName: yup.string().required().label("Hospital name is required"),
    drugName: yup.string().required().label("Drug name id required"),
    dosage: yup.string().required().label("Drug dosage is required"),
  })
  .required();
export default function EprescriptionPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<prescriptionUpload>({
    resolver: yupResolver(schema),
  });
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const onSubmit = async (data: prescriptionUpload) => {
    // data.userType = "user";
    // setLoading(true);
    // await userService
    //   .signUp(data)
    //   .then((res) => {
    //     console.log({ res });
    //     if (res.data) {
    //       login({ email: data.email, password: data.password });
    //       reset();
    //     } else {
    //       toast.error(
    //         res.data.message || res.data.error || "Something went wrong"
    //       );
    //     }
    //   })
    //   .catch((err) => {
    //     console.log({ err });
    //     setLoading(false);
    //     setServerError(err.response.data.message);
    //   });
  };
  const hasError = (field: keyof prescriptionUpload) =>
    errors[field] ? true : false;

  return (
    <div>
      <Head>
        <title>E-prescription - Maima</title>
        <meta name="description" content="my maima e-prescription page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBanner title="E-Prescription" />
      <Box
        sx={{
          width: { xs: "90%", md: 580 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 1, md: 2 },
          m: {
            xs: "20px auto",
            md: "30px auto",
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomLabel>
                Patient ID <sup style={{ color: "#ED3572" }}>*</sup>
              </CustomLabel>
              <CustomTextField
                fullWidth
                size="small"
                error={hasError("patientID")}
                inputProps={{
                  ...register("patientID"),
                }}
              />
              {hasError("patientID") && (
                <FormHelperText error={hasError("patientID")}>
                  {errors.patientID?.message}
                </FormHelperText>
              )}
            </Grid>{" "}
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomLabel>
                Hospital Name <sup style={{ color: "#ED3572" }}>*</sup>
              </CustomLabel>
              <CustomTextField
                fullWidth
                size="small"
                error={hasError("hospitalName")}
                inputProps={{
                  ...register("hospitalName"),
                }}
              />
              {hasError("hospitalName") && (
                <FormHelperText error={hasError("hospitalName")}>
                  {errors.hospitalName?.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomLabel>
                Drug name <sup style={{ color: "#ED3572" }}>*</sup>
              </CustomLabel>
              <CustomTextField
                fullWidth
                size="small"
                error={hasError("drugName")}
                inputProps={{
                  ...register("drugName"),
                }}
              />
              {hasError("drugName") && (
                <FormHelperText error={hasError("drugName")}>
                  {errors.drugName?.message}
                </FormHelperText>
              )}
            </Grid>{" "}
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomLabel>
                Dosage <sup style={{ color: "#ED3572" }}>*</sup>
              </CustomLabel>
              <CustomTextField
                fullWidth
                size="small"
                error={hasError("drugName")}
                inputProps={{
                  ...register("drugName"),
                }}
              />
              {hasError("drugName") && (
                <FormHelperText error={hasError("drugName")}>
                  {errors.drugName?.message}
                </FormHelperText>
              )}
            </Grid>{" "}
            <Grid item xs={12}>
              <CustomLabel>
                Prescription File. ( Only .Pdf, .Png, .Jpg, .Jpeg Files Are
                Allowed )
              </CustomLabel>
              <FileInput />
            </Grid>
            <Grid item xs={12}>
              <CustomLabel>Additional Information</CustomLabel>
              <CustomTextField
                fullWidth
                size="small"
                inputProps={{
                  ...register("additionalInfo"),
                }}
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <Button
                size="medium"
                type="submit"
                disableElevation
                // loading={loading}
                sx={{
                  bgcolor: "rgba(38, 81, 163)",
                  color: "#ffffff",
                  boxSizing: "border-box",
                  width: "100%",
                  borderRadius: "5px",
                  p: "10px 12px",
                  mt: 2,
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
                Submit Prescription
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}
EprescriptionPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
